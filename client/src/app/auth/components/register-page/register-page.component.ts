import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MaterializeService } from '@app/shared/materialize/materialize.service';
import { AuthService } from '@app/shared/services/auth.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [ './register-page.component.scss' ]
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private registerSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  public ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  public onSubmit(): void {
    this.form.disable();

    this.registerSubscription = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate([ '/login' ], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        MaterializeService.toast(error.error.message);
        this.form.enable();
      },
    );
  }

  private initLoginForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(6) ]),
    });
  }
}
