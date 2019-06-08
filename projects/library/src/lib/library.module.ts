import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ACheckboxModule } from '@acaprojects/ngx-checkbox';

import { version } from './settings';

import * as dayjs_api from 'dayjs';
const dayjs = dayjs_api;

import { ADynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { ADynamicFormFieldComponent } from './components/dynamic-field/dynamic-form-field.component';
import { ACustomFormFieldComponent } from './components/custom-field/custom-form-field.component';

@NgModule({
    declarations: [
        ADynamicFormComponent,
        ADynamicFormFieldComponent,
        ACustomFormFieldComponent
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule, ACheckboxModule],
    exports: [
        ADynamicFormComponent,
        ADynamicFormFieldComponent,
        ACustomFormFieldComponent
    ]
})
export class LibraryModule {
    public static version = 'local-dev';
    private static init = false;
    readonly build = dayjs();

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd') ? `Today at ${this.build.format('h:mmA')}` : this.build.format('D MMM YYYY, h:mmA');
            version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_DYNAMIC_FORM_MODULE };
export { LibraryModule as ADynamicFormModule };
