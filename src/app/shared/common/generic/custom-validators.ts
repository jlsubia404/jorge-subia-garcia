import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static dateGreaterOrEqualThanTodayValidator(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }
        const inputDate = new Date(control.value + 'T00:00:00');

        const currentDate = new Date();
        // Set the current date time to 00:00:00 to compare only the date part
        currentDate.setHours(0, 0, 0, 0);

        return inputDate >= currentDate ? null : { dateBeforeToday: true };
    }
}