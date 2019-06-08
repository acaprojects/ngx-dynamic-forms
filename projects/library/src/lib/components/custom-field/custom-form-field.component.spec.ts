
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ACustomFormFieldComponent } from '../custom-field/custom-form-field.component';

describe('ACustomFormFieldComponent', () => {
    let fixture: ComponentFixture<ACustomFormFieldComponent>;
    let component: ACustomFormFieldComponent;
    let clock: jasmine.Clock;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ACustomFormFieldComponent
            ],
            imports: [CommonModule, FormsModule, ReactiveFormsModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ACustomFormFieldComponent);
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
