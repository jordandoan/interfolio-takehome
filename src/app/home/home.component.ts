import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  @Input() pageIndex: number = 0; // Page index
  @Input() query: string; // Search term

  data: any; // The data received by API
  works: any; // List of works from API
  loading: boolean; // Shows spinner when calling API
  errorMessage: any; // Error message from API

  constructor(private apiHttpService: ApiHttpService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    localStorage.clear();
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData()
  }

  // Process of calling the API
  // Checks for cached data. If not, then it makes a call and stores results into local storage.
  getData() {
    this.loading = true;
    this.errorMessage = null;
    let offset = 0 || this.pageIndex * this.rows;
    let cacheKey = this.createKey(offset)
    let cache = localStorage.getItem(cacheKey);
    // Offset is used to receive different works
    if (cache) {
      this.setFields(JSON.parse(cache))
    } else {
      let options = {
        params: {
          rows: this.rows,
          offset: offset,
          query: this.query
        }
        // can add search terms in here when ready
      }
      this.fetch('', options)
    }
  }

  // creates a key for caching search results and pages
  createKey(offset) {
    let key = `query_${this.query}_page_${this.pageIndex}_offset_${offset}`
    return key
  }

  // Makes call to API using our apiHttp service
  fetch(url, options) {
    this.apiHttpService.get(url, options).subscribe({
      next: res => {
        this.setFields(res);
        localStorage.setItem(this.createKey(options.params.offset), JSON.stringify(res))
      },
      error: err => {
        this._snackbar.open(err.message, "CLOSE")
      }
    })
  }

  // Sets state for data, works, and loading variables
  setFields(data) {
    this.data = data;
    this.works = data.message.items;
    this.loading = false;
  }
}
