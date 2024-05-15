import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEComponent } from './dialog-e.component';

describe('DialogEComponent', () => {
  let component: DialogEComponent;
  let fixture: ComponentFixture<DialogEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
