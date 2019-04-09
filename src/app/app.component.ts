import { Component, ViewContainerRef, ViewEncapsulation, OnInit } from '@angular/core';

import { AppService } from './services/app.service';
import { ADynamicFormField } from '../../lib/src/public_api';

import * as day_api from 'dayjs';
const dayjs = day_api;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public model: { [name: string]: any } = {};

    constructor(private view: ViewContainerRef, private service: AppService) {}

    public ngOnInit(): void {
        this.model.fields = [
            new ADynamicFormField({ type: 'input', key: name, label: 'Your name', value: null }),
            new ADynamicFormField({ type: 'action', key: name, label: 'Your host', value: 'Check' }),
            new ADynamicFormField({ type: 'checkbox', key: name, attributes: { label: 'Attending' }, value: null }),
            new ADynamicFormField({ type: 'textarea', key: name, label: 'Your name', value: null })
        ];
        setInterval(() => this.model.fields[0].setValue(`${Math.floor(Math.random() * 99999)}`), 5000);
    }

    public toggle() {
        console.warn('Toggle');
        this.model.test = !this.model.test;
    }
}
