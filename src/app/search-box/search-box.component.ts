import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  filter
} from 'rxjs/operators';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  searchField: FormControl = new FormControl();
  wordList: any;
  displayList = false;
  constructor(private router: Router, private http: ApiService) {}
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
          this.displayList = true;
          this.wordList = data;
          console.log(this.wordList);
        },
        error => {
          console.log(error);
        }
      );
  }

  onBlur(value) {
    this.displayList = false;
  }
  onFocus(value) {
    if (value.length > 0) {
      this.displayList = true;
    } else {
      this.displayList = false;
    }
  }
  onListClick(e) {
    e.stopPropagation();
    this.router.navigate([
      '/definition',
      e.srcElement.children['0'].computedName
    ]);
    console.log(e.srcElement.children['0'].computedName);
  }
}
