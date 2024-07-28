import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RegisterService } from '../register-service/register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let registerService: jasmine.SpyObj<RegisterService>;

  beforeEach(async () => {
    const registerServiceSpy = jasmine.createSpyObj('RegisterService', ['sendRegister']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerService = TestBed.inject(RegisterService) as jasmine.SpyObj<RegisterService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set message on successful registration', () => {
    const response = { message: 'Registro exitoso' };
    registerService.sendRegister.and.returnValue(of(response));

    component.registerForm.setValue({
      username: 'testuser',
      mail: 'test@mail.com',
      password: 'password123'
    });
    component.sendRegister();

    expect(component.message).toBe('Registro exitoso');
  });

  it('should set message when user or email is already registered', () => {
    const errorResponse = { status: 409 };
    registerService.sendRegister.and.returnValue(throwError(errorResponse));

    component.registerForm.setValue({
      username: 'testuser',
      mail: 'test@mail.com',
      password: 'password123'
    });
    component.sendRegister();

    expect(component.message).toBe('El usuario o correo ya están registrados');
  });

  it('should set message on general registration failure', () => {
    const errorResponse = { status: 500 };
    registerService.sendRegister.and.returnValue(throwError(errorResponse));

    component.registerForm.setValue({
      username: 'testuser',
      mail: 'test@mail.com',
      password: 'password123'
    });
    component.sendRegister();

    expect(component.message).toBe('El registro falló. Por favor intenta de nuevo.');
  });
});
