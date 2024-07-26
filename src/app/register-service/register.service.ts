import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { json } from 'stream/consumers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://127.0.0.1:3000/api/register'

  constructor(private http: HttpClient) { }

  sendRegister(obj: any) : Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Custom-Header': 'CustomHeaderValue' // Añade otros encabezados que necesites
    });

    return this.http.post<any>(this.apiUrl, obj, {headers});

  }
}
