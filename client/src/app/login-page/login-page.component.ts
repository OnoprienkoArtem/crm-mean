import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from '@app/shared/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup;

  constructor(private auth: AuthService) {
  }

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
    this.auth.login(this.form.value).subscribe(
      () => console.log('Login succes'),
      error => console.warn(error),
    );
  }

  private initLoginForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }
}
