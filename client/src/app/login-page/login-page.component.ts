import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EMAIL_ERROR_MESSAGES, PASSWORD_ERROR_MESSAGES} from "./error-message.config";



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup;
  public emailErrorMessages = EMAIL_ERROR_MESSAGES;
  public passwordErrorMessages = PASSWORD_ERROR_MESSAGES;

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public ngOnInit(): void {
    this.initLoginForm();
  }

  public onSubmit(): void {

  }

  private initLoginForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }
}
