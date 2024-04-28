import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSharingComponent } from './card-sharing.component';

describe('CardSharingComponent', () => {
  let component: CardSharingComponent;
  let fixture: ComponentFixture<CardSharingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSharingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
