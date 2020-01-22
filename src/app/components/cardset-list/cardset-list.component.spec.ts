import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetListComponent } from './cardset-list.component';

describe('CardsetListComponent', () => {
  let component: CardsetListComponent;
  let fixture: ComponentFixture<CardsetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
