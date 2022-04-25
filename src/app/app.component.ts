import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'interfolio-takehome';
  pageEvent: PageEvent;

  handlePage (event?: PageEvent) {
    this.pageEvent = event;
  }
}
