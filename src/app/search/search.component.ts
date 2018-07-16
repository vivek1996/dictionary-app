import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  wordList: any;
  constructor(private http: ApiService) {}
  searchField: FormControl = new FormControl();
  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(query => this.http.getWords(query))
      )
      .subscribe(data => {
        this.wordList = data;
        console.log(this.wordList);
      });
  }
  search(value) {
    this.http.getWords(value).subscribe(data => {
      this.wordList = data;
      console.log(this.wordList);
    });
  }
}
