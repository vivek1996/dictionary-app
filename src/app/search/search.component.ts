import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter,
  skip
} from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  wordList: any;
  constructor( private route: ActivatedRoute,
    private router: Router, private http: ApiService) {}
  searchField: FormControl = new FormControl();
  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        filter(value => !value || value.length > 2 || value !== ''),
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => value !== ''),
        // prettier-ignore
        switchMap( query => query.length > 2 ? this.http.getWords(query) : this.wordList = ' ')
      )
      .subscribe(
        data => {
          this.wordList = '';
          this.wordList = data;
          console.log(this.wordList);
        },
        error => {
          console.log(error);
        }
      );
  }
  // search() {
  //   if (this.searchField.value === ' ') {
  //     this.wordList = ' ';
  //   } else if (this.searchField.value.length > 3) {
  //     this.searchField.valueChanges
  //       .pipe(
  //         skip(3),
  //         debounceTime(200),
  //         distinctUntilChanged(),
  //         switchMap(query => this.http.getWords(query))
  //       )
  //       .subscribe(
  //         data => {
  //           this.wordList = data;
  //           console.log(this.wordList);
  //           console.log(this.searchField);
  //         },
  //         error => {
  //           console.log(error);
  //         }
  //       );
  //   }
  // }
}
