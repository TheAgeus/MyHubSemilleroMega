import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token:string = '';

  private apiUrl = 'http://127.0.0.1:3000/api'

  constructor(private http: HttpClient, private router: Router) { }

  isAuth() {
    try {
      
      this.token = localStorage.getItem("token") ?? '';
    } catch (error) {
      
    }
    console.log("token", this.token);
    return this.token.length > 0;
  }

  sendLogin(obj: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue' // Añade otros encabezados que necesites
    });

    return this.http.post<any>(`${this.apiUrl}/login`, obj, {headers});
  }

  logout() : void {
    localStorage.removeItem('token');
    this.token = '';
    this.router.navigate(['/'])
  }

  getMovieCategories(): Observable<string[]> {
    const token = this.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/movie-categories`, {headers});
  }

  getSerieCategories(): Observable<string[]> {
    const token = this.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/serie-categories`, {headers});
  }

  getAllMovies(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/movies`, {headers});
  }
  getAllSeries(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/series`, {headers});
  }

  getMoviesByCategory(category:string): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/get_by_category/movies/${category}`, {headers});
  }

  getSeriesByCategory(category:string): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/get_by_category/series/${category}`, {headers});
  }

  getSerieById(id:number): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/series/${id}`, {headers});
  }

  getMovieById(id:number): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/movies/${id}`, {headers});
  }

  getFavoriteMovies(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/favorite_movies`, {headers});
  }

  getFavoriteSeries(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/favorite_series`, {headers});
  }

  eraseFavMovie(id : any): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/eraseFavMovie/${id}`, {headers});
  } 

  eraseFavSerie(id : any): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/eraseFavSerie/${id}`, {headers});
  } 

  addFavSerie(id : any): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/addFavSerie/${id}`, {headers});
  } 

  addFavMovie(id : any): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/addFavMovie/${id}`, {headers});
  } 

}
