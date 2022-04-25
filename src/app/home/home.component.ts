import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() rows!: number;
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
}
