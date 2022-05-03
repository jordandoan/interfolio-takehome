import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  query = "";
  @Output() sendQuery = new EventEmitter<String>()

  constructor() { }

  searchWithQuery() {
    alert(this.query);
    this.sendQuery.emit(this.query);
  }

  ngOnInit(): void {
  }

}
