import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  public ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken) {
      this.auth.setToken(potentialToken);
    }
  }
}
