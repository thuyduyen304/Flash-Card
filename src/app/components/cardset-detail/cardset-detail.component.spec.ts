import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetDetailComponent } from './cardset-detail.component';

describe('CardsetDetailComponent', () => {
  let component: CardsetDetailComponent;
  let fixture: ComponentFixture<CardsetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
