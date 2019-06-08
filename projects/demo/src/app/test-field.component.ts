import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ADynamicFormField } from 'projects/library/src/public-api';

@Component({
    selector: 'a-test-field',
    template: `Test`,
    styles: [``]
})
export class TestFieldComponent implements OnInit {
    constructor(private field: ADynamicFormField, private group: FormGroup) {
        console.log('Field:', field, group);
    }

    ngOnInit(): void { }
}
