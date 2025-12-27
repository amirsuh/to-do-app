import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinBucket } from './medicin-bucket';

describe('MedicinBucket', () => {
  let component: MedicinBucket;
  let fixture: ComponentFixture<MedicinBucket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicinBucket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicinBucket);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
