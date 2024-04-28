import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRejectedComponent } from './card-rejected.component';

describe('CardRejectedComponent', () => {
  let component: CardRejectedComponent;
  let fixture: ComponentFixture<CardRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRejectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
