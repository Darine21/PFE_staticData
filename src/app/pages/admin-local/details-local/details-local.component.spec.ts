import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsLocalComponent } from './details-local.component';

describe('DetailsLocalComponent', () => {
  let component: DetailsLocalComponent;
  let fixture: ComponentFixture<DetailsLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsLocalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
