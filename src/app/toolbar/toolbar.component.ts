import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

// Header for page, which contains the paginator
export class ToolbarComponent implements OnInit {
  @Output() newPageEvent = new EventEmitter<PageEvent>(); // event emitter for paginator

  // Sends pageEvent to components, where we can get the pageIndex
  public getWorks(event?: PageEvent): void {
    this.newPageEvent.emit(event)
  }
  constructor() { }

  ngOnInit(): void {
    this.getWorks(null);
  }

}
