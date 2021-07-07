import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MaterializeService } from '@app/shared/materialize/materialize.service';
import { AuthService } from '@app/core/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private authSubscription: Subscription;

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

  public ngOnInit(): void {
    this.initLoginForm();
  }

  public ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  public onSubmit(): void {
    this.form.disable();

    this.authSubscription = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate([ '/overview' ]),
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

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializeService.toast('Now you can login using your data.');
      } else if (params['accessDenied']) {
        MaterializeService.toast('You should login to the system.');
      } else if (params['sessionFailed']) {
        MaterializeService.toast('Please login again.');
      }
    });
  }
}
