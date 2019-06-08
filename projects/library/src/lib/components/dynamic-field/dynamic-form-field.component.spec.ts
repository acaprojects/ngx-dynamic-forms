
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TextFieldModule } from '@angular/cdk/text-field';

import { ADynamicFormFieldComponent } from './dynamic-form-field.component';
import { ACustomFormFieldComponent } from '../custom-field/custom-form-field.component';
import { ACheckboxModule } from '@acaprojects/ngx-checkbox';

describe('ADynamicFormFieldComponent', () => {
    let fixture: ComponentFixture<ADynamicFormFieldComponent>;
    let component: ADynamicFormFieldComponent;
    let clock: jasmine.Clock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ADynamicFormFieldComponent,
                ACustomFormFieldComponent
            ],
            imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule, ACheckboxModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ADynamicFormFieldComponent);
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
