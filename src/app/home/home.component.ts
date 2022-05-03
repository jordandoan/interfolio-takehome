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

// Displays list of works from CrossRef API
export class HomeComponent implements OnInit, OnChanges {
  @Input() rows: number; // Number of rows viewed per page
  @Input() pageEvent: PageEvent; // From the Material's paginator, used for API call

  data: any; // The data received by API
  works: any; // List of works from API
  loading: boolean; // Shows spinner when calling API
  errorMessage: any; // Error message from API

  constructor(private apiHttpService: ApiHttpService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.clear();
    this.getData(null)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData(changes)
  }

  // Process of calling the API
  // Checks for cached data. If not, then it makes a call and stores results into local storage.
  getData(changes?: SimpleChanges): void {
    this.loading = true;
    this.errorMessage = null;
    let pageIndex = 0;
    if (this.pageEvent && changes['pageEvent']) {
      pageIndex = this.pageEvent.pageIndex;
    }
    let cache = localStorage.getItem("offset" + pageIndex);
    // Offset is used to receive different works
    let offset = pageIndex * this.rows;
    if (cache) {
      this.setFields(JSON.parse(cache))
    } else {
      let options = {
        rows: this.rows,
        offset: offset
        // can add search terms in here when ready
      }
      this.fetch('', options, pageIndex)
    }
  }

  // Makes call to API using our apiHttp service
  fetch(url, options, pageIndex): void {
    this.apiHttpService.get(url, options).subscribe({
      next: res => {
        this.setFields(res);
        localStorage.setItem("offset" + pageIndex, JSON.stringify(res))
      },
      error: err => {
        this._snackbar.open(err.message, "CLOSE")
      }
    })
  }

  // Sets state for data, works, and loading variables
  setFields(data): void {
    this.data = data;
    this.works = data.message.items;
    this.loading = false;
  }
}
