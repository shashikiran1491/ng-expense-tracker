import {FormControl, FormGroup, Validators} from "@angular/forms";

export class LoginForm extends FormGroup{
  readonly email = new FormControl<string>('', [Validators.required, Validators.email]);
  readonly password = new FormControl<string>('', [Validators.required]);

  constructor() {
    super({});
    this.setControl('email', this.email);
    this.setControl('password', this.password);
  }
}
