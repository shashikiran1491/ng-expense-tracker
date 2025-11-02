import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

export class RegistrationForm extends FormGroup {

    readonly firstName = new FormControl<string>('', [Validators.required]);
    readonly lastName = new FormControl<string>('', [Validators.required]);
    readonly email = new FormControl<string>('', [Validators.required, Validators.email]);
    readonly password = new FormControl<string>('', [Validators.required, Validators.minLength(8)]);
    readonly confirmPassword = new FormControl<string>('', [Validators.required]);

    constructor() {
        super({});
        this.setControl('email', this.email);
        this.setControl('password', this.password);
        this.setControl('confirmPassword', this.confirmPassword);
        this.setControl('firstName', this.firstName);
        this.setControl('lastName', this.lastName);

        this.addValidators([this.confirmValidator, this.passwordStrengthValidator]);
}

    confirmValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;

        if (password && confirmPassword && password !== confirmPassword) {
            control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }

        return null;
    }

    passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);

        const passwordValid = hasUpper && hasLower && hasNumber;
        return passwordValid ? null : { passwordStrength: true };
    }
}