
import { ADynamicFormField } from './dynamic-form-field.class';

describe('ADynamicFormField', () => {
    let instance: ADynamicFormField;
    let clock: jasmine.Clock;

    beforeEach(() => {
        clock = jasmine.clock();
        instance = new ADynamicFormField({ key: 'test', type: 'input', value: '' });
        clock.uninstall();
        clock.install();
    });

    afterEach(() => {
        clock.uninstall();
    });

    it('should create an instance', () => {
        expect(instance).toBeTruthy();
    });

    // TODO: add tests
});
