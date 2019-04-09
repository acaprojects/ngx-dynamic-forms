
import { TemplateRef, Type } from '@angular/core';
import { FormControl, AbstractControl, Validators, FormGroup } from '@angular/forms';

export interface IFormFieldOptions<T = any> {
    /** Identier of the form field */
    key: string;
    /** Display name of the form field */
    name: string;
    /** Displayed icon for the form field */
    icon?: IFormFieldIcon;
    /** Type of input control the form field is */
    control_type?: 'text' | 'multiline' | 'select' | 'checkbox' | 'dropdown' | 'group' | 'custom';
    /** Initial value of the form field */
    value: T;
    /** Whether form control disabled */
    disabled?: boolean;
    /** Whether the form field is required */
    required?: boolean;
    /** Validators for the form field */
    validators?: ValidationFn[];
    /** Whether to hide the form field */
    hide?: boolean;
    /** Children form fields i.e. To use this you must set the control type to `'group'` */
    children?: IFormFieldOptions<any>[];
    /** Content for Custom Form Fields */
    content?: FormFieldContent;
    /** Metadata passed into custom field contents */
    metadata?: { [name: string]: any };
    /** Form Field settings */
    settings?: IFormFieldSettings;
    /** Function for formatting the display value of th */
    format?: (value: T) => string;
    /** Action callback for `select` control_type */
    action?: (value: T) => Promise<T>;
}

export interface IFormFieldSettings {
    /** Whether to hide field status icon */
    hide_status?: boolean;
    /** Whether to display field as readonly */
    readonly?: boolean;
    /** Whether custom component should fill whitespace */
    flex?: boolean;
}

export interface IFormFieldIcon {
    /** Icon type. Image or font/CSS icon */
    type: 'image' | 'img' | 'icon';
    /** CSS class to add to the icon element */
    class: string;
    /** Contents of the icon elment */
    value: string;
    /** URL to the icon image file */
    src: string;
}

export type ValidationFn = (AbstractControl) => { [error: string]: boolean | string; message?: string };
export type FormFieldContent = TemplateRef<any> | Type<any> | string;

export class ADynamicFormField<T = any> {
    /** Identifier of the form field */
    readonly key: string;
    /** Display name of the form field */
    readonly name: string;
    /** Display icon of the form field */
    readonly icon: IFormFieldIcon;
    /** Angular Form Control element*/
    readonly control: FormControl | FormGroup;
    /** Children form fields */
    readonly children: ADynamicFormField<any>[] = [];
    /** Custom form field contents */
    readonly content: FormFieldContent;
    /** Metadata passed into custom field contents */
    readonly metadata: { [name: string]: any };
    /** Whether to force the display of errors */
    public show_errors: boolean;

    constructor(options: IFormFieldOptions<T>) {
        let validators = [];
        if (options.required) {
            validators.push(Validators.required);
        }
        if (options.validators && options.validators.length > 0) {
            validators = validators.length > 0 ? [...validators, ...options.validators] : [...options.validators];
        }
        this.key = options.key;
        this.name = options.name;
        this.content = options.content;
        this.metadata = options.metadata;
        if (!options.control_type || options.control_type !== 'group') {
            this.control = new FormControl({ value: options.value, disabled: options.disabled }, validators);
        } else {
            if (options.children && options.children.length > 0) {
                options.children.forEach(i => this.children.push(new ADynamicFormField(i)));
            }
            this.control = new FormGroup(this.children.reduce((a, i) => a[i.key] = i.control, {}));
        }
    }

    /**
     * Sets the disabled state of the form field control
     * @param state Whether the field is disabled
     */
    public disabled(state: boolean): void {
        state ? this.control.disable() : this.control.enable();
    }

    /**
     * Get the current value of the form field
     */
    public getValue(): T {
        return this.control.value;
    }

    /**
     * Get whether the form field is valid
     */
    public isValid(): boolean {
        return this.control.valid;
    }

    /**
     * Set the state for forcing the display of errors
     * @param state Whether to force the display of errors. Defaults to `true`
     */
    public showErrors(state: boolean = true): void {
        this.show_errors = state;
    }

    /**
     * Whether errors should be displayed in the component
     */
    public canDisplayErrors(): boolean {
        return this.control.dirty || this.show_errors;
    }
}
