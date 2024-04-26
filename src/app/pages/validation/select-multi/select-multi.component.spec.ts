import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMultiComponent } from './select-multi.component';

describe('SelectMultiComponent', () => {
  let component: SelectMultiComponent;
  let fixture: ComponentFixture<SelectMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
