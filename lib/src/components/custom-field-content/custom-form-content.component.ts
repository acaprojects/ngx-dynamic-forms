import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ADynamicFormField } from '../dynamic-field.class';

@Component({
    selector: 'a-custom-form-field-content',
    template: ``,
    styles: [``]
})
export class CustomFormFieldContentComponent implements OnInit, OnDestroy {
    protected control: FormControl;
    protected ref_controls: { [name: string]: FormControl };
    protected timers: { [name: string]: number } = {};

    constructor(protected field: ADynamicFormField<any>, protected group: FormGroup) { }

    public ngOnInit(): void {
        this.control = this.field.control as FormControl;
        if (this.field.references) {
            for (const ref of this.field.references) {
                if (this.group[ref]) {
                    const control = this.group.controls[ref] as FormControl;
                    this.ref_controls[ref] = control;
                    control.valueChanges.subscribe((v) => this.onChange(ref, v));
                }
            }
        }
        this.control.valueChanges.subscribe((v) => this.onChange(this.field.key, v));
    }

    public ngOnDestroy(): void {
        if (this.timers) {
            for (const key in this.timers) {
                if (this.timers.hasOwnProperty(key) && this.timers[key]) {
                    clearTimeout(this.timers[key]);
                    this.timers[key] = null;
                }
            }
        }
    }

    /**
     * Get formatted display value of the field value
     */
    public get format(): string {
        return this.field.formatted();
    }

    /**
     * Callback for changes to local field and references
     * @param key Key of the changed value
     * @param value New value
     */
    protected onChange<T = any>(key: string, value: T): void { }

    /**
     * Get reference with the given index
     * @param index Index of the reference
     */
    protected ref(index: number): FormControl {
        return this.field.references && this.field.references.length > index
            ? this.ref_controls[this.field.references[index]]
            : null;
    }

    public timeout(name: string, fn: () => void, delay: number = 300): void {
        this.clearTimer(name);
        if (!(fn instanceof Function)) { return; }
        this.timers[name] = <any>setTimeout(() => fn(), delay);
    }

    public clearTimer(name: string): void {
        if (this.timers[name]) {
            clearTimeout(this.timers[name]);
            this.timers[name] = null;
        }
    }
}
