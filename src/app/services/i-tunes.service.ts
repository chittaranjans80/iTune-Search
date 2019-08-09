import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITuneResponse } from '../model/iTune-response.model';

@Injectable({
  providedIn: 'root'
})
export class ITunesService {
  private baseUrl = 'https://itunes.apple.com/';
  constructor(private http: HttpClient) { }

  searchTrack(searchTerm: string, callback = 'callback'): Observable<ITuneResponse[]> {
    const searchUrl = this.baseUrl + 'search?term=' + searchTerm;
    return this.http.jsonp(searchUrl, callback).pipe(
      map((res: any) => res.results.map(element => new ITuneResponse(element))));
  }

}
