import { Component, Input, TemplateRef, OnChanges, SimpleChanges, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ADynamicFormField, FormFieldContent } from '../dynamic-field.class';

@Component({
    selector: 'a-custom-form-field',
    templateUrl: './custom-form-field.component.html',
    styles: [`a-custom-form-field:host { width: 100%; }`]
})
export class CustomFormFieldComponent implements OnChanges {
    /** CSS class to add to the root element of the component */
    @Input() public klass = 'default';
    /** Form field data */
    @Input() public field: ADynamicFormField;
    /** Form group which the field belongs */
    @Input() public group: FormGroup;
    /** Method with which to inject content in to the component */
    public method: 'template' | 'component' | 'text';
    /** Content to inject into the component */
    public content: FormFieldContent;
    /** Context data to pass to the template/component injected into the component */
    public context;

    public ctx_injector: Injector;

    constructor(private injector: Injector) { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.field) {
            this.setMethod();
        }
    }

    /** Set injection method based of the content passed */
    public setMethod() {
        if (!this.field) { return; }
        this.method = 'component';
        this.content = this.field.content;
        this.klass = this.field.metadata ? this.field.metadata.klass || this.klass || 'default' : this.klass || 'default';
        console.log('');

        if (typeof this.content === 'string') {
            this.method = 'text';
        } else if (this.content instanceof TemplateRef) {
            this.method = 'template';
            this.context = { ...this.field.metadata, key: this.field.key, group: this.group };
        } else {
            this.ctx_injector = Injector.create([
                { provide: ADynamicFormField, useValue: this.field },
                { provide: FormGroup, useValue: this.group }
            ], this.injector);
        }
    }
}
