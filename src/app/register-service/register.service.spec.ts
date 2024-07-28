import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes después de cada prueba
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send register request and return expected response', () => {
    const mockRequestData = { username: 'testuser', password: 'password123' };
    const mockResponseData = { message: 'Registration successful' };

    service.sendRegister(mockRequestData).subscribe(response => {
      expect(response).toEqual(mockResponseData);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Custom-Header')).toBe('CustomHeaderValue');

    req.flush(mockResponseData); // Simula la respuesta de la solicitud HTTP
  });

  it('should handle error response', () => {
    const mockRequestData = { username: 'testuser', password: 'password123' };
    const mockErrorMessage = 'Registration failed';

    service.sendRegister(mockRequestData).subscribe({
      next: () => fail('should have failed with the 400 error'),
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.error).toBe(mockErrorMessage);
      }
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');

    req.flush(mockErrorMessage, { status: 400, statusText: 'Bad Request' });
  });
});