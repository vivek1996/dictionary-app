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
  public varientForms = [];
  public show = true;
  public notes = [];
  public currentWord;
  public antonyms = [];
  public synonyms = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: ApiService,
    private location: Location,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.currentWord = routeParams.id;
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
    this.lexicalEntries = this.resultsObj['lexicalEntries'];
    // Remove Residue data from the full data
    this.residueRemoved = this.lexicalEntries.filter(
      lexicalEntry => lexicalEntry.lexicalCategory !== 'Residual'
    );
    this.varientForms = []; // make varientForms array empty
    this.antonyms = [];
    this.synonyms = [];
    this.extractData(this.residueRemoved);
  }
  play(audio) {
    audio.play(); // play audio on clicking speak icon
  }
  extractData(data) {
    for (const singleData of data) {
      console.log(singleData);
      // Extracting Word Origin data
      if (singleData.entries['0'].etymologies) {
        this.wordOrigin = singleData.entries['0'].etymologies;
      }
      // Extracting Varient Forms data
      if (singleData.entries['0'].hasOwnProperty('variantForms')) {
        this.varientForms.push(singleData.entries['0'].variantForms['0'].text);
      }
      // "MyCamelCaseString".replace(/([a-z](?=[A-Z]))/g, '$1 ')
      // Extract notes
      if (singleData.entries['0'].hasOwnProperty('notes')) {
        // console.log(singleData.entries['0'].notes);
        for (const note of singleData.entries['0'].notes) {
          this.notes.push(note);
        }
      }
    }
    console.log(this.notes);
    this.getSyn();
    this.toastr.info(`Definition of ${this.resultsObj['word']} is Loaded`);
  }
  getSyn() {
    this.http.getSynAnt(this.currentWord).subscribe(data => {
      const datas = data;
     // console.log(datas.results['0'].lexicalEntries);
      this.seprateData(datas.results['0'].lexicalEntries);
    });
  }
  seprateData(datas) {
    for (const data of datas) {
      console.log(data.entries['0'].senses);
    }
  }
}
