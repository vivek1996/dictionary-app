import { Component, OnInit } from '@angular/core';
import { Subscriber } from '../../../node_modules/rxjs';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  wordList;
  constructor(private http: ApiService) {}

  ngOnInit() {
    this.searchWord('magic');
  }
  searchWord(value) {
    this.http.getWords(value).subscribe(data => {
      this.wordList = data;
      console.log(this.wordList);
    });
  }
}
