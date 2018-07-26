import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}
  // Service to get data
  getWords(word: string) {
    return this.http.get(`/api/search/en?q=${word}&prefix=false&limit=10`);
  }
  // Service to get full data
  getDefinition(word: string) {
    return this.http.get(`/api/entries/en/${word}`);
  }
  // Service to get synonyms and antonyms
  getSynAnt(word: string) {
    return this.http.get(`/api/entries/en/${word}/synonyms;antonyms`);
  }
}
