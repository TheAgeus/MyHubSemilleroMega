import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ApiService } from '../api-service/api.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['sendLogin']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set token and navigate to Dashboard on successful login', () => {
    const response = { token: 'fake-token' };
    apiService.sendLogin.and.returnValue(of(response));

    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123'
    });
    component.sendLogin();

    expect(apiService.token).toBe('fake-token');
    expect(localStorage.getItem('token')).toBe('fake-token');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/Dashboard');
  });

  it('should set message if user does not exist (401 error)', () => {
    const errorResponse = { status: 401 };
    apiService.sendLogin.and.returnValue(throwError(errorResponse));

    component.loginForm.setValue({
      username: 'nonexistentuser',
      password: 'password123'
    });
    component.sendLogin();

    expect(component.message).toMatch(/El registro falló. Por favor intenta de nuevo.|El usuario no existe/);
  });

  it('should set message if password is incorrect (402 error)', () => {
    const errorResponse = { status: 402 };
    apiService.sendLogin.and.returnValue(throwError(errorResponse));

    component.loginForm.setValue({
      username: 'testuser',
      password: 'wrongpassword'
    });
    component.sendLogin();

    expect(component.message).toBe('Contraseña incorrecta');
  });

  it('should set message on general login failure', () => {
    const errorResponse = { status: 500 };
    apiService.sendLogin.and.returnValue(throwError(errorResponse));

    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123'
    });
    component.sendLogin();

    expect(component.message).toBe('El registro falló. Por favor intenta de nuevo.');
  });
});
