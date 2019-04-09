import { Component, OnInit, Input } from '@angular/core';
import { ADynamicFormField } from '../dynamic-field.class';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'a-dynamic-form-field',
    templateUrl: './dynamic-form-field.component.html',
    styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent {
    /** CSS class to add to the root element of the component */
    @Input() public klass = 'default';
    /** Form fields */
    @Input() public field: ADynamicFormField;
    /** Form group the field is associated with */
    @Input() public group: FormGroup;

}
