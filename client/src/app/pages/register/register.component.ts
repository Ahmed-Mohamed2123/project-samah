import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUp: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.signUp = this.fb.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      specialize: new FormControl(null, Validators.required),
    });
  }

  get email(): any {
    return this.signUp.get('email')?.value;
  }

  get password(): any {
    return this.signUp.get('password')?.value;
  }

  signupUser(): any {

    const emailLogin = {
      email: this.email,
      password: this.password
    };

    this.authService.signup(this.signUp.value)
      .subscribe(() => {
        this.authService.login(emailLogin)
          .subscribe((data: {accessToken: string, name: string}) => {
            const accessToken = data.accessToken;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('name', data.name);
            this.router.navigate(['/home']);
          }, err => {
            console.log(err);
          });
      }, error => {
        console.log(error);
      });
  }

}
