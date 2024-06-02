import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareVComponent } from './share-v.component';

describe('ShareVComponent', () => {
  let component: ShareVComponent;
  let fixture: ComponentFixture<ShareVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
