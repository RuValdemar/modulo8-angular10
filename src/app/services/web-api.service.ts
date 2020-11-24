import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebAPIService {

  constructor(private http: HttpClient) { }

  obtenerUsernames(): Observable<string[]>{
    const url = '/assets/usernames.json';
    return this.http.get<string[]>(url);
  }
}
