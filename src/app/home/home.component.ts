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

  data: any
  works: any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const works = localStorage.getItem("works" + this.rows)
    if (works) {
      this.data = JSON.parse(works);
      this.works = this.data.message.items;
    } else {
      this.http.get('https://api.crossref.org/works?rows=' + this.rows).subscribe(res => {
        this.data = res;
        this.works = this.data.message.items
        localStorage.setItem("works" + this.rows, JSON.stringify(res))
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageEvent']) {
      this.http.get('https://api.crossref.org/works?rows=' + this.rows + '&offset=' + this.pageEvent.pageIndex).subscribe(res => {
        this.data = res;
        this.works = this.data.message.items
      })
    }
  }
}
