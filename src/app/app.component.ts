import { Component, ViewContainerRef, ViewEncapsulation, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { AppService } from './services/app.service';
import { ADynamicFormField } from '../../lib/src/public_api';

import * as day_api from 'dayjs';
import { TestFieldComponent } from './text-field.component';
const dayjs = day_api;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public model: { [name: string]: any } = {};

    @ViewChild(TemplateRef) private dropdown: TemplateRef<any>;

    constructor(private view: ViewContainerRef, private service: AppService) {}

    public ngOnInit(): void {
        this.model.fields = [
            new ADynamicFormField({ type: 'input', key: 'name', label: 'Your name', value: null }),
            new ADynamicFormField({ type: 'action', key: 'host', label: 'Your host', value: 'Check' }),
            new ADynamicFormField({ type: 'checkbox', key: 'attending', attributes: { label: 'Attending' }, value: null }),
            new ADynamicFormField({ type: 'textarea', key: 'other_name', label: 'Your name', value: null }),
            new ADynamicFormField({
                type: 'custom',
                key: 'other_name',
                content: this.dropdown,
                label: 'The dropdown',
                value: 'Item 2',
                metadata: { options: ['Item 1', 'Item 2', 'Item 3'] }
            }),
            new ADynamicFormField({
                type: 'custom',
                key: 'test',
                content: TestFieldComponent,
                label: 'The test',
                value: 'Item 2',
                metadata: { options: ['Item 1', 'Item 2', 'Item 3'] }
            })
        ];
        setInterval(() => {
            const value = Math.floor(Math.random() * 99999);
            console.log('Value:', value);
            this.model.fields[0].setValue(`${value}`);
        }, 5000);
    }

    public toggle() {
        console.warn('Toggle');
        this.model.test = !this.model.test;
    }
}
