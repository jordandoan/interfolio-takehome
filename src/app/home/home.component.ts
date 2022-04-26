import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    localStorage.clear();
    this.loading = true;
    const works = localStorage.getItem("works" + this.rows)
    if (works) {
      this.setFields(JSON.parse(works))
    } else {
      this.http.get('https://api.crossref.org/works?rows=' + this.rows).subscribe(res => {
        this.setFields(res);
        localStorage.setItem("worksoffset0", JSON.stringify(res))
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    if (this.pageEvent && changes['pageEvent']) {
      let cache = localStorage.getItem("worksoffset" + this.pageEvent.pageIndex);
      if (cache) {
        this.setFields(JSON.parse(cache))
      } else {
        this.http.get('https://api.crossref.org/works?rows=' + this.rows + '&offset=' + this.pageEvent.pageIndex).subscribe(res => {
          this.setFields(res);
          localStorage.setItem("worksoffset" + this.pageEvent.pageIndex, JSON.stringify(res));
        });
      }
    }
  }

  setFields(data) {
    this.data = data;
    this.works = data.message.items;
    this.loading = false;
  }
}
