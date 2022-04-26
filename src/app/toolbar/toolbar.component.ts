import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @Output() newPageEvent = new EventEmitter<PageEvent>();

  public getWorks(event?: PageEvent) {
    this.newPageEvent.emit(event)
  }
  constructor() { }

  ngOnInit(): void {
    this.getWorks(null);
  }

}
