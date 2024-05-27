import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input-error',
    standalone: false,
    templateUrl: './input-error.component.html',
    styleUrl: './input-error.component.scss'
})
export class InputErrorComponent {
    @Input() form: FormGroup | undefined;
    @Input() formItem: string | undefined;

    get item() {
        return this.form?.get(this.formItem ?? '')!;
    }
}
