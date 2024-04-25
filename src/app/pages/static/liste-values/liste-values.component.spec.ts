import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeValuesComponent } from './liste-values.component';

describe('ListeValuesComponent', () => {
  let component: ListeValuesComponent;
  let fixture: ComponentFixture<ListeValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
