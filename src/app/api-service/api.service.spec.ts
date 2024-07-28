import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let router: Router;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService,{ provide: Router, useValue: routerSpy }]
    });

    service = TestBed.inject(ApiService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
  });



  afterEach(() => {
    httpMock.verify();
  });

  // Añadir pruebas aquí

  // With this, we prove that we are auth
  it('should return true when token is present in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('sample-token');
    expect(service.isAuth()).toBeTrue();
  });

  it('should return false when token is absent in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isAuth()).toBeFalse();
  });

  it('should handle errors gracefully and return false', () => {
    spyOn(localStorage, 'getItem').and.throwError('Error accessing localStorage');
    expect(service.isAuth()).toBeFalse();
  });

  // prove that my api works

  // return all movies
  it('should retrieve all movies', () => {
    const dummyMovies = [
      { id: 1, name: 'Movie 1' },
      { id: 2, name: 'Movie 2' },
    ];
  
    service.getAllMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/movies`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should retrieve favorite movies', () => {
    const dummyMovies = [
      { id: 1, name: 'Favorite Movie 1' },
      { id: 2, name: 'Favorite Movie 2' },
    ];
  
    service.getFavoriteMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/favorite_movies`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should add favorite movie', () => {
    const movieId = 1;
  
    service.addFavMovie(movieId).subscribe(response => {
      expect(response).toEqual({message: "favorito agregado"});
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/addFavMovie/${movieId}`);
    expect(req.request.method).toBe('GET');
    req.flush({message: "favorito agregado"});
  });

  it('should remove favorite movie', () => {
    const movieId = 1;
  
    service.eraseFavMovie(movieId).subscribe(response => {
      expect(response).toEqual({message: "favorito agregado"});
    });
  
    const req = httpMock.expectOne(`${service.apiUrl}/eraseFavMovie/${movieId}`);
    expect(req.request.method).toBe('GET');
    req.flush({message: "favorito agregado"});
  });

  it('should send a login request and return the response', () => {
    const mockResponse = { token: 'sample-token' };
    const loginData = { username: 'testuser', password: 'password123' };

    service.sendLogin(loginData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Custom-Header')).toBe('CustomHeaderValue');
    req.flush(mockResponse);
  });
  
  it('should remove the token from localStorage and navigate to home', () => {
    spyOn(localStorage, 'removeItem');
    service.token = 'sample-token';

    service.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(service.token).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should get movie categories and return the response', () => {
    const mockResponse: string[] = ['Action', 'Comedy', 'Drama'];
    const token = 'sample-token';
    service.token = token;

    service.getMovieCategories().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/movie-categories`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Custom-Header')).toBe('CustomHeaderValue');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockResponse);
  });
});