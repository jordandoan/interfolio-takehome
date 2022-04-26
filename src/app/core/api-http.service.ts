// Angular Modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJs
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(
    // Angular Modules
    private http: HttpClient
  ) {}
  private baseURL: String = 'https://api.crossref.org/works?mailto=jordandoan@hotmail.com';

  public get = (url: string, options?: any): Observable<any> =>
    this.http.get(this.baseURL + url, options);
  }