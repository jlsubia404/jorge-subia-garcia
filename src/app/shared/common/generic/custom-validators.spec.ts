import { AbstractControl } from "@angular/forms";
import { CustomValidators } from "./custom-validators";

describe('CustomValidators', () => {
    describe('dateGreaterOrEqualThanTodayValidator', () => {
        it('should return null if control value is null or empty', () => {
            let control = { value: null } as AbstractControl;
            const result = CustomValidators.dateGreaterOrEqualThanTodayValidator(control);
            expect(result).toBeNull();

            control = { value: '' } as AbstractControl;
            expect(CustomValidators.dateGreaterOrEqualThanTodayValidator(control)).toBeNull();
        });

        it('should return null if control value is today\'s date', () => {
            const today = new Date().toISOString().split('T')[0];
            const control = { value: today } as AbstractControl;
            const result = CustomValidators.dateGreaterOrEqualThanTodayValidator(control);
            expect(result).toBeNull();
        });

        it('should return null if control value is a future date', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1);
            const control = { value: futureDate.toISOString().split('T')[0] } as AbstractControl;
            const result = CustomValidators.dateGreaterOrEqualThanTodayValidator(control);
            expect(result).toBeNull();
        });

        it('should return validation error if control value is a past date', () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1);
            const control = { value: pastDate.toISOString().split('T')[0] } as AbstractControl;
            const result = CustomValidators.dateGreaterOrEqualThanTodayValidator(control);
            expect(result).toEqual({ dateBeforeToday: true });
        });
    });
});
