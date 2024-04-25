import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidDiaComponent } from './valid-dia.component';

describe('ValidDiaComponent', () => {
  let component: ValidDiaComponent;
  let fixture: ComponentFixture<ValidDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidDiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
