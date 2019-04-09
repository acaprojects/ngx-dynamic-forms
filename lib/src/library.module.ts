/**
 * @Author: Alex Sorafumo
 * @Email:  alex@yuion.net
 */

import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';

import { LIBRARY_SETTINGS } from './settings';

import * as day_api from 'dayjs';
const dayjs = day_api;

const COMPONENTS: Type<any>[] = [];
const DIRECTIVES: Type<any>[] = [];

@NgModule({
    declarations: [...COMPONENTS, ...DIRECTIVES],
    imports: [CommonModule],
    exports: [...COMPONENTS, ...DIRECTIVES]
})
class LibraryModule {
    public static version = '0.1.0';
    private static init = false;
    private build = dayjs(1554789802000);

    constructor() {
        if (!LibraryModule.init) {
            const now = dayjs();
            LibraryModule.init = true;
            const build = now.isSame(this.build, 'd')
                ? `Today at ${this.build.format('h:mmA')}`
                : this.build.format('D MMM YYYY, h:mmA');
            LIBRARY_SETTINGS.version(LibraryModule.version, build);
        }
    }
}

export { LibraryModule as ACA_DYNAMIC_FORMS_MODULE };
export { LibraryModule as DynamicFormsModule };
