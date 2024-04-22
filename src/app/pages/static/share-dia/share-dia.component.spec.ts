import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDiaComponent } from './share-dia.component';

describe('ShareDiaComponent', () => {
  let component: ShareDiaComponent;
  let fixture: ComponentFixture<ShareDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareDiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
