import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationEComponent } from './creation-e.component';

describe('CreationEComponent', () => {
  let component: CreationEComponent;
  let fixture: ComponentFixture<CreationEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationEComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreationEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
