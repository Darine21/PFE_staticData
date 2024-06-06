import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationLocalComponent } from './validation-local.component';

describe('ValidationLocalComponent', () => {
  let component: ValidationLocalComponent;
  let fixture: ComponentFixture<ValidationLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
