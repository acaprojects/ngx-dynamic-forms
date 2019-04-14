import { Component, OnInit } from '@angular/core';
import { ADynamicFormField } from '../../lib/src/public_api';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'a-test-field',
    template: ``,
    styles: [``]
})
export class TestFieldComponent implements OnInit {
    constructor(private field: ADynamicFormField, private group: FormGroup) {
        console.log('Field:', field, group);
    }

    ngOnInit(): void { }
}
