import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'interfolio-takehome';
  pageEvent: PageEvent = null;
  pageIndex: number = 0;
  query: string = "";

  handleQuery(event) {
    this.query = event;
  }

  handlePageEvent(event) {
    this.pageEvent = event;
    this.pageIndex = event && event.pageIndex || 0;
  }


}
