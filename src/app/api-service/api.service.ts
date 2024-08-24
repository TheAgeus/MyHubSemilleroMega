import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token:string = '';

  apiUrl = 'https://localhost:7181/api'

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

    return this.http.post<any>(`${this.apiUrl}/Auth/login`, obj, {headers});
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
    return this.http.get<string[]>(`${this.apiUrl}/Movies/categories`, {headers});
  }

  getSerieCategories(): Observable<string[]> {
    const token = this.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/Series/categories`, {headers});
  }

  getAllMovies(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/movies`, {headers});
  }
  getAllSeries(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/series`, {headers});
  }

  getMoviesByCategory(category:string): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/get_by_category/movies/${category}`, {headers});
  }

  getSeriesByCategory(category:string): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/get_by_category/series/${category}`, {headers});
  }

  getSerieById(id:number): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/Series/series/${id}`, {headers});
  }

  getMovieById(id:number): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/Movies/movies/${id}`, {headers});
  }

  getFavoriteMovies(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/favorite_movies`, {headers});
  }

  getWatchingMovies(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/watching_movies`, {headers});
  }

  getFavoriteSeries(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/favorite_series`, {headers});
  }

  getWatchingSeries(): Observable<any[]> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/User/watching_series`, {headers});
  }

  eraseFavMovie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/User/eraseFavMovie/${id}`, {headers});
  } 

  eraseWatchMovie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/User/eraseWatchMovie/${id}`, {headers});
  } 

  eraseFavSerie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/User/eraseFavSerie/${id}`, {headers});
  } 

  eraseWatchSerie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.delete<{ message: string }>(`${this.apiUrl}/User/eraseWatchSerie/${id}`, {headers});
  } 

  addFavSerie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<{ message: string }>(`${this.apiUrl}/User/user_like_serie/${id}`, {headers});
  } 

  addWatchSerie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<{ message: string }>(`${this.apiUrl}/User/user_watch_serie/${id}`, {headers});
  } 

  addFavMovie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    console.log(headers)
    return this.http.get<{ message: string }>(`${this.apiUrl}/User/user_like_movie/${id}`, {headers});
  } 

  addWatchMovie(id : any): Observable<{ message: string }> {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    console.log(headers)
    return this.http.get<{ message: string }>(`${this.apiUrl}/User/user_watch_movie/${id}`, {headers});
  } 

  getChaptersBySerieId(serieId: number) {
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue', // Add other headers as needed
      'Authorization': `Bearer ${token}` // Add the token as an Authorization header
    });
    return this.http.get<string[]>(`${this.apiUrl}/Series/series/${serieId}/chapters`, {headers});
  }

}
