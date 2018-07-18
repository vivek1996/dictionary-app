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
          this.fullData = data.results;
          console.log(this.fullData);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
