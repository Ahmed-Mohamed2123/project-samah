import { User } from 'src/app/models/user';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDto: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginDto = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login(): any {
    this.authService.login(this.loginDto.value)
      .subscribe((data: {accessToken: string, name: string}) => {
        const accessToken = data.accessToken;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('name', data.name);
        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
      });
  }

}
