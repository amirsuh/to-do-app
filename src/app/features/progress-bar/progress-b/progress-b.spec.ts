import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressB } from './progress-b';

describe('ProgressB', () => {
  let component: ProgressB;
  let fixture: ComponentFixture<ProgressB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressB]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressB);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
