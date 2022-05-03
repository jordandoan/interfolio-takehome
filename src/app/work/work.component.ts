import { Component, OnInit, Input, setTestabilityGetter } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
// Component that renders a card for a published work
export class WorkComponent implements OnInit {
  @Input() work: any;
  title: string;
  author: string;
  constructor() { }

  ngOnInit(): void {
    this.setTitle();
    this.setAuthor();
  }

  setAuthor(): void {
    if (this.work.author) {
      this.author = this.work.author.map(
        author => (author.given + " " + author.family)
      ).join(", ");
    } else {
      this.author = "Unknown author";
    }
  }

  setTitle(): void {
    // sets title to Untitled if there is no title
    this.title = (this.work['title'] && this.work['title'][0]) || "Untitled";
  }
}
