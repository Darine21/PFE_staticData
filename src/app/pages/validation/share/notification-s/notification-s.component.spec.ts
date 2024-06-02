import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSComponent } from './notification-s.component';

describe('NotificationSComponent', () => {
  let component: NotificationSComponent;
  let fixture: ComponentFixture<NotificationSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
