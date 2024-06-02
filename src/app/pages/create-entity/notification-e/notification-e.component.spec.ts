import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationEComponent } from './notification-e.component';

describe('NotificationEComponent', () => {
  let component: NotificationEComponent;
  let fixture: ComponentFixture<NotificationEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
