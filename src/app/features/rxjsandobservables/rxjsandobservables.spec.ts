import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rxjsandobservables } from './rxjsandobservables';

describe('Rxjsandobservables', () => {
  let component: Rxjsandobservables;
  let fixture: ComponentFixture<Rxjsandobservables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rxjsandobservables]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rxjsandobservables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
