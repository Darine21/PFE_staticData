import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardValidationComponent } from './card-validation.component';

describe('CardValidationComponent', () => {
  let component: CardValidationComponent;
  let fixture: ComponentFixture<CardValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
