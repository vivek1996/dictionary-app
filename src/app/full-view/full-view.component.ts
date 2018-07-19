import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.scss']
})
export class FullViewComponent implements OnInit {
  public fullData;
  public resultsObj = {};
  public lexicalEntries = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: ApiService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.http.getDefinition(routeParams.id).subscribe(
        data => {
          this.fullData = data;
          this.updateData(this.fullData);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
  updateData(data) {
    this.resultsObj = data.results['0'];
    console.log(this.resultsObj);
    this.lexicalEntries = this.resultsObj['lexicalEntries'];
    console.log(this.lexicalEntries);
  }
}
