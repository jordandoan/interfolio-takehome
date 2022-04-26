import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  @Input() rows: number;
  @Input() pageEvent: PageEvent;

  data: any;
  works: any;
  loading: boolean;
  errorMessage: any;

  constructor(private http: HttpClient, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.clear();
    this.fetch(null)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetch(changes)
  }

  fetch(changes?: SimpleChanges) {
    this.loading = true;
    this.errorMessage = null;
    if (this.pageEvent && changes['pageEvent']) {
      let cache = localStorage.getItem("offset" + (this.pageEvent.pageIndex * this.rows));
      if (cache) {
        this.setFields(JSON.parse(cache))
      } else {
        this.http.get('https://api.crossref.org/works?rows=' + this.rows + '&offset=' + (this.pageEvent.pageIndex * this.rows) + "&mailto=jordandoan@hotmail.com").subscribe(res => {
          this.setFields(res);
          localStorage.setItem("offset" + (this.pageEvent.pageIndex * this.rows), JSON.stringify(res));
        }, err => {
          this._snackbar.open(err.message, "CLOSE")
        });
      }
    } else {
      // initial fetch
      this.http.get('https://api.crossref.org/works?rows=' + this.rows + "&mailto=jordandoan@hotmail.com").subscribe(res => {
        this.setFields(res);
        localStorage.setItem("offset0", JSON.stringify(res))
      }, err => {
        this._snackbar.open(err.message, "CLOSE")
      })
    }
  }
  
  setFields(data) {
    this.data = data;
    this.works = data.message.items;
    this.loading = false;
  }
}
