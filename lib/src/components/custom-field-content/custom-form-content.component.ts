import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ADynamicFormField } from '../dynamic-field.class';

@Component({
    selector: 'a-custom-form-field-content',
    template: ``,
    styles: [``]
})
export class CustomFormFieldContentComponent implements OnInit {
    protected control: FormControl;
    protected ref_controls: { [name: string]: FormControl };

    constructor(protected field: ADynamicFormField<any>, protected group: FormGroup) { }

    ngOnInit(): void {
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

    /**
     * Get formatted display value of the field value
     */
    public get format() {
        return this.field.formatted();
    }

    /**
     * Callback for changes to local field and references
     * @param key Key of the changed value
     * @param value New value
     */
    protected onChange<T = any>(key: string, value: T) { }

    /**
     * Get reference with the given index
     * @param index Index of the reference
     */
    protected ref(index: number) {
        return this.field.references && this.field.references.length > index
            ? this.ref_controls[this.field.references[index]]
            : null;
    }
}
