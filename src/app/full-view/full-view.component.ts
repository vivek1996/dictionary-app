import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-full-view',
  templateUrl: './full-view.component.html',
  styleUrls: ['./full-view.component.scss']
})
export class FullViewComponent implements OnInit {
  public fullData;
  public resultsObj = {};
  public lexicalEntries = [];
  public residueRemoved = [];
  public wordOrigin;
  public grammaticalFeatures = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: ApiService,
    private location: Location,
    private toastr: ToastrService
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
    // console.log(this.resultsObj);
    this.lexicalEntries = this.resultsObj['lexicalEntries'];
    // console.log(this.lexicalEntries);
    this.residueRemoved = this.lexicalEntries.filter(
      lexicalEntry => lexicalEntry.lexicalCategory !== 'Residual'
    );
    console.log(this.residueRemoved);
    this.extractData(this.residueRemoved);
  }
  play(audio) {
    audio.play();
  }
  extractData(data) {
    for (const singleData of data) {
      console.log(singleData);
      this.grammaticalFeatures.push(
        singleData.entries['0'].grammaticalFeatures
      );
      if (singleData.entries['0'].etymologies) {
        // console.log(singleData.entries['0'].etymologies);
        this.wordOrigin = singleData.entries['0'].etymologies;
      }
    }
    // console.log(this.grammaticalFeatures);
    this.toastr.info(`Definition of ${this.resultsObj['word']} is Loaded`);
  }
}
