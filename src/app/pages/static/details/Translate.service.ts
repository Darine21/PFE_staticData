import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiUrl = 'https://google-translate113.p.rapidapi.com/api/v1/translator/text';
  private apiKey = 'ea0889bb8amshdad2bf607a0f12bp1d4f47jsn9374318bfd36';

  constructor(private http: HttpClient) { }

  translate(text: string , source:string, target:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
    });

    let params = new HttpParams();
    params = params.set('from', source);
    params = params.set('to', target);
    params = params.set('text', text);

    return this.http.post(this.apiUrl, params.toString(), { headers });
  }
}
