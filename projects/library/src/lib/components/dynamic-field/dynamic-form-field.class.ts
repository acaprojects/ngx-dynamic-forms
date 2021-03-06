import { TemplateRef, Type } from '@angular/core';
import { FormControl, AbstractControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

export interface IFormFieldOptions<T = any> {
    /** Identier of the form field */
    key: string;
    /** Type of input control the form field is */
    type: 'input' | 'textarea' | 'action' | 'checkbox' | 'dropdown' | 'group' | 'custom';
    /** Initial value of the form field */
    value: T;
    /** Display name of the form field */
    label?: string;
    /** Displayed icon for the form field */
    icon?: IFormFieldIcon;
    /** Whether form control disabled */
    disabled?: boolean;
    /** Whether the form field is required */
    required?: boolean;
    /** Field keys that this field references */
    references?: string[];
    /** Validators for the form field */
    validators?: ValidationFn[];
    /** Whether to hide the form field */
    hide?: boolean;
    /** Children form fields i.e. To use this you must set the control type to `'group'` */
    children?: IFormFieldOptions[];
    /** Content for Custom Form Fields */
    content?: FormFieldContent;
    /** Metadata passed into custom field contents */
    metadata?: { [name: string]: any };
    /** Form Field element attributes */
    attributes?: { [name: string]: string };
    /** Form Field settings */
    settings?: IFormFieldSettings;
    /** Function for formatting the display value of the form field */
    format?: (value: T) => string;
}

export interface IFormFieldSettings {
    /** Whether to hide field status icon */
    hide_status?: boolean;
    /** Whether to display field as readonly */
    readonly?: boolean;
    /** Whether custom component should fill whitespace */
    flex?: boolean;
    /** Show count of list items next to the field label */
    show_count?: boolean;
    /** Hide status icon */
    no_status?: boolean;
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
/** Angular Template or Component or raw HTML */
export type FormFieldContent = TemplateRef<any> | Type<any> | string;

export class ADynamicFormField<T = any> {
    /** Identifier of the form field */
    readonly key: string;
    /** Type of input control the form field is */
    readonly type: 'input' | 'textarea' | 'action' | 'checkbox' | 'dropdown' | 'group' | 'custom';
    /** Display name of the form field */
    readonly label: string;
    /** Display icon of the form field */
    readonly icon: IFormFieldIcon;
    /** Angular Form Control element*/
    readonly control: FormControl | FormGroup;
    /** Children form fields */
    readonly children: ADynamicFormField<any>[] = [];
    /** Custom form field contents */
    readonly content: FormFieldContent;
    /** Form field input control attriabutes */
    readonly attributes: { [name: string]: string };
    /** Whether the field is required to have a value */
    readonly required: boolean;
    /** Other field keys to reference */
    readonly references: string[];
    /** Whether to force the display of errors */
    public show_errors: boolean;
    /** Whether to display the form field */
    private _hide: boolean;
    /** Metadata passed into custom field contents */
    private _metadata: { [name: string]: any };
    /** Field settings */
    private _settings: IFormFieldSettings;

    /** Function for formatting the display value of the form field */
    private format: (value: T) => string;
    /** Subject for emitting actions on the field */
    public action: Subject<T> = new Subject<T>();

    constructor(options: IFormFieldOptions<T>) {
        if (!options || !options.key || !options.type) {
            throw new Error('ADynamicFormField needs a key and type to be set');
        }
        let validators = [];
        if (options.required) {
            validators.push(Validators.required);
        }
        if (options.validators && options.validators.length > 0) {
            validators = validators.length > 0 ? [...validators, ...options.validators] : [...options.validators];
        }
        this.key = options.key;
        this.type = options.type;
        this.label = options.label;
        this.required = options.required;
        this.content = options.content;
        this._metadata = options.metadata;
        this._settings = options.settings;
        this.attributes = options.attributes;
        this._hide = options.hide;
        this.format = options.format;
        this.references = options.references;
        if (!options.type || options.type !== 'group') {
            this.control = new FormControl({ value: options.value, disabled: options.disabled }, validators);
        } else {
            if (options.children && options.children.length > 0) {
                options.children.forEach(i => this.children.push(i instanceof ADynamicFormField ? i : new ADynamicFormField(i)));
            }
            this.control = new FormGroup(this.children.reduce((a, i) => {(a[i.key] = i.control); return a; }, {}));
        }
    }

    /**
     * Sets the disabled state of the form field control
     * @param state Whether the field is disabled
     */
    public setDisabled(state: boolean): void {
        state ? this.control.disable() : this.control.enable();
    }

    /**
     * Whether the form control is disabled
     */
    public get disabled() {
        return this.control.disabled;
    }

    /** Whether this form control is displayed */
    public get hide() {
        return this._hide;
    }

    /** Whether the field is readonly */
    public get readonly(): boolean {
        return !!this.settings.readonly;
    }

    /**
     * Set whether the form field is displayed on the DOM
     * @param state Whether the form field is displayed
     */
    public setHide(state: boolean) {
        this._hide = state;
    }

    /**
     * Get the current value of the form field
     */
    public getValue(): T {
        return this.control.value;
    }

    /**
     * Get the current value of the form field
     */
    public setValue(value: T): void {
        if (this.control instanceof FormControl) {
            this.control.setValue(value);
        }
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

    /** Whether errors should be displayed in the component */
    public get canDisplayErrors(): boolean {
        return this.control.dirty || this.show_errors;
    }

    /** Formatted form control value */
    public get formatted(): (string | T) {
        return this.format ? this.format(this.getValue()) : this.getValue();
    }

    /** Metadata passed into custom field contents */
    public get metadata(): { [name: string]: any } {
        return { ...this._metadata };
    }

    public set metadata(data: { [name: string]: any }) {
        delete this._metadata;
        this._metadata = data;
    }

    public get settings(): IFormFieldSettings {
        return this._settings || {};
    }

    /** Get the error message for the form control */
    public get error() {
        const errors = this.control.errors;
        if (errors && this.canDisplayErrors) {
            if (errors.message) {
                return errors.message;
            } else if (errors.required) {
                return `${this.label} is required`;
            }
        }
        return null;
    }

    /**
     * Call the action function for the control
     */
    public performAction() {
        this.action.next(this.getValue());
    }
}
