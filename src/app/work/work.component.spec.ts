import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkComponent } from './work.component';

describe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;
  let title: HTMLElement;
  let published: HTMLElement;
  let testWork = {
    title: ["Test title"],
    publisher: "Test publisher",
    issued: {
      "date-parts": [[2000,1,1]]
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
    component.work = testWork;
    component.title = "Test title";
    title = fixture.nativeElement.querySelector('.card-title');
    published = fixture.nativeElement.querySelector('.published');
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have `Test title` as title', () => {
    expect(title.innerHTML).toContain(testWork.title[0]);
  });

  it('should have `Test publisher` as publisher', () => {
    expect(published.innerHTML).toContain(testWork.publisher);
  });
});
