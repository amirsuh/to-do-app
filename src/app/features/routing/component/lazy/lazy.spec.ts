import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lazy } from './lazy';

describe('Lazy', () => {
  let component: Lazy;
  let fixture: ComponentFixture<Lazy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lazy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lazy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
