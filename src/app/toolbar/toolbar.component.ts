import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

// Header for page, which contains the paginator
export class ToolbarComponent implements OnInit {
  @Output() newPageEvent = new EventEmitter<PageEvent>();
  @Output() sendQuery = new EventEmitter<string>()
  @ViewChild(MatPaginator) paginator: MatPaginator;

  handleQuery(event) {
    this.sendQuery.emit(event)
    this.paginator.firstPage();
  }
  // Sends pageEvent to components, where we can get the pageIndex
  public getWorks(event?: PageEvent) {
    this.newPageEvent.emit(event)
  }
  constructor() { }

  ngOnInit(): void {
    this.getWorks(null);
  }

}
