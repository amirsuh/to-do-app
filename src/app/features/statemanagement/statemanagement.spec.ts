import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statemanagement } from './statemanagement';

describe('Statemanagement', () => {
  let component: Statemanagement;
  let fixture: ComponentFixture<Statemanagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statemanagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Statemanagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
