import { Component, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';

import { ADynamicFormField, IFormFieldOptions } from 'projects/library/src/public-api';
import { TestFieldComponent } from './test-field.component';

@Component({
    selector: 'app-root',
    templateUrl: `./app.component.html`,
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public model: { [name: string]: any } = {};

    @ViewChild(TemplateRef, { static: true }) private dropdown: TemplateRef<any>;

    public ngOnInit(): void {
        const fields: IFormFieldOptions[] = [
            { type: 'input', key: 'name', label: 'Your name', value: null },
            { type: 'action', key: 'host', label: 'Your host', value: 'Check' },
            { type: 'checkbox', key: 'attending', attributes: { label: 'Attending' }, value: null },
            { type: 'textarea', key: 'other_name', label: 'Your name', value: null },
            {
                type: 'custom',
                key: 'other_name',
                content: this.dropdown,
                label: 'The dropdown',
                value: 'Item 2',
                metadata: { options: ['Item 1', 'Item 2', 'Item 3'] }
            },{
                type: 'custom',
                key: 'test',
                content: TestFieldComponent,
                label: 'The test',
                value: 'Item 2',
                metadata: { options: ['Item 1', 'Item 2', 'Item 3'] }
            },
            {
                type: 'group', key: 'name', value: null, children: [
                { type: 'input', key: 'f_name', label: 'Your name', value: null },
                { type: 'input', key: 'l_name', label: 'Your name', value: null }
            ] }
        ];
        this.model.fields = fields.map(i => new ADynamicFormField(i));
        this.model.fields.filter(i => i.type === 'action').forEach(i => i.action.subscribe(() => console.log('Action Called')));
        setInterval(() => {
            const value = Math.floor(Math.random() * 99999);
            console.log('Value:', value);
            this.model.fields[0].setValue(`${value}`);
        }, 5000);
    }
}
