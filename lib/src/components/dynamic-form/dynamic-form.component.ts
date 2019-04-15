import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ADynamicFormField } from '../dynamic-field.class';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'a-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
    /** CSS class to add to the root element of the component */
    @Input() public klass = 'default';
    /** Form fields */
    @Input() public fields: ADynamicFormField[];

    public group: FormGroup;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.fields) {
            setTimeout(() => this.initForm(), 50);
        }
    }

    private initForm() {
        this.group = new FormGroup(
            this.fields.reduce((a, i) => {
                if (i.control instanceof FormGroup) {
                    for (const f of i.children) {
                        a[f.key] = f.control;
                    }
                } else if (i.control instanceof FormControl) {
                    a[i.key] = i.control;
                }
                return a;
            }, {})
        );
    }
}
