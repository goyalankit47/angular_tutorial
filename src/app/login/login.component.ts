import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidCredentialsMessage: string;
  constructor(private _router: Router, private _authService: AuthService) { this.invalidCredentialsMessage = null; }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  submit() {
    if (this.form.value.username === 'application' && this.form.value.password === 'test') {
      this._authService.authStatus = true;
      this.invalidCredentialsMessage = null;
      this._router.navigate(['/dashboard']);
    } else {
      this.invalidCredentialsMessage = 'Invalid credentials';
    }
  }

}
