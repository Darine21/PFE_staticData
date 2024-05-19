import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSpecComponent } from './dialog-spec.component';

describe('DialogSpecComponent', () => {
  let component: DialogSpecComponent;
  let fixture: ComponentFixture<DialogSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSpecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
