
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TextFieldModule } from '@angular/cdk/text-field';
import { ACheckboxModule } from '@acaprojects/ngx-checkbox';

import { ADynamicFormComponent } from './dynamic-form.component';
import { ADynamicFormFieldComponent } from '../dynamic-field/dynamic-form-field.component';
import { ACustomFormFieldComponent } from '../custom-field/custom-form-field.component';


describe('ADynamicFormComponent', () => {
    let fixture: ComponentFixture<ADynamicFormComponent>;
    let component: ADynamicFormComponent;
    let clock: jasmine.Clock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ADynamicFormComponent,
                ADynamicFormFieldComponent,
                ACustomFormFieldComponent
            ],
            imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule, ACheckboxModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ADynamicFormComponent);
        component = fixture.debugElement.componentInstance;
        clock = jasmine.clock();
        fixture.detectChanges();
        clock.uninstall();
        clock.install();
    });

    afterEach(() => {
        clock.uninstall();
    });

    it('should create an instance', () => {
        expect(component).toBeTruthy();
    });

    // TODO: add tests
});
