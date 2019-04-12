/**
 * @Author: Alex Sorafumo
 * @Email:  alex@yuion.net
 */

import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';

import { CheckboxModule } from '@acaprojects/ngx-checkbox';
import { DropdownModule } from '@acaprojects/ngx-dropdown';

import { LIBRARY_SETTINGS } from './settings';

import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './components/dynamic-field/dynamic-form-field.component';
import { CustomFormFieldComponent } from './components/custom-field/custom-form-field.component';
import { CustomFormFieldContentComponent } from './components/custom-field-content/custom-form-content.component';

import * as day_api from 'dayjs';
const dayjs = day_api;

const COMPONENTS: Type<any>[] = [
    DynamicFormComponent,
    DynamicFormFieldComponent,
    CustomFormFieldComponent,
    CustomFormFieldContentComponent
];
const DIRECTIVES: Type<any>[] = [];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule, CheckboxModule, DropdownModule],
    exports: [...COMPONENTS]
})
class LibraryModule {
    public static version = '0.2.3';
    private static init = false;
    private build = dayjs(1555050033000);

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd') ? `Today at ${this.build.format('h:mmA')}` : this.build.format('D MMM YYYY, h:mmA');
            LIBRARY_SETTINGS.version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_DYNAMIC_FORMS_MODULE };
export { LibraryModule as DynamicFormsModule };
