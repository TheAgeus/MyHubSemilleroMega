import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  message : string = "";

  apiService = inject(ApiService);

  constructor(private router: Router) {}

  loginForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl('')
    }
  );

  // post login and returns a token that stores in local storage and in api service
  sendLogin() {
    const body = JSON.stringify({
      'username' :this.loginForm.value.username,
      'password' : this.loginForm.value.password 
    })
    this.apiService.sendLogin(body).subscribe({
      next: (res: any) => {
        if (res.token) {
          console.log("theres is token")
          this.apiService.token = res.token; // here we store in api service
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/Dashboard');
          console.log("Se supone que te debe direccionar")
        }
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 401) {
          this.message = 'El usuario no existe';
        }
        if (error.status === 402) {
            this.message = 'Contraseña incorrecta';
        } else {
          this.message = 'El registro falló. Por favor intenta de nuevo.';
        }
      }
    })
  }

}
