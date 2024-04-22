import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectDiaComponent } from './reject-dia.component';

describe('RejectDiaComponent', () => {
  let component: RejectDiaComponent;
  let fixture: ComponentFixture<RejectDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectDiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
