import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiHttpService } from '../core/api-http.service';

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

  constructor(private apiHttpService: ApiHttpService, private _snackbar: MatSnackBar) { }

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
    let pageIndex = 0;
    if (this.pageEvent && changes['pageEvent']) {
      pageIndex = this.pageEvent.pageIndex;
    }
    let cache = localStorage.getItem("offset" + pageIndex);
    let offset = pageIndex * this.rows;
    if (cache) {
      this.setFields(JSON.parse(cache))
    } else {
      this.apiHttpService.get(`&rows=${this.rows}&offset=${offset}`).subscribe({
        next: res => {
          this.setFields(res);
          localStorage.setItem("offset" + pageIndex, JSON.stringify(res))
        },
        error: err => {
          this._snackbar.open(err.message, "CLOSE")
        }
      })
    }
  }
  
  setFields(data) {
    this.data = data;
    this.works = data.message.items;
    this.loading = false;
  }
}
