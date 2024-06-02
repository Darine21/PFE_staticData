import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVComponent } from './details-v.component';

describe('DetailsVComponent', () => {
  let component: DetailsVComponent;
  let fixture: ComponentFixture<DetailsVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
