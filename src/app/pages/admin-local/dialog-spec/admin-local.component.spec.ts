import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocalComponent } from './admin-local.component';

describe('AdminLocalComponent', () => {
  let component: AdminLocalComponent;
  let fixture: ComponentFixture<AdminLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
