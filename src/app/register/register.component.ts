import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../register-service/register.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  message : string = "";
  errorMessage : string = "";

  registerService = inject(RegisterService);

  registerForm = new FormGroup({ 
    username: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl('')
  });

  sendRegister() {

    const body = JSON.stringify({
      'username' :this.registerForm.value.username ,
      'mail' : this.registerForm.value.mail ,
      'password' : this.registerForm.value.password 
    })

    this.registerService.sendRegister(body).subscribe({
      next: (res: any) => {
        console.log('res', res);
        if (res.message) {
          this.message = res.message;
        }
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 409) {
          this.message = 'El usuario o correo ya están registrados';
        } else {
          this.message = 'El registro falló. Por favor intenta de nuevo.';
        }
      }
    });

  }

}
