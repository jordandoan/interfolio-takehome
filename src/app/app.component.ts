import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'interfolio-takehome';
  pageIndex: number = 0;
  query: string = "";

  handleQuery(event) {
    this.query = event;
  }

  handlePageEvent(event) {
    if (event) {
      this.pageIndex = event.pageIndex;
    } else {
      this.pageIndex = 0
    }
  }


}
