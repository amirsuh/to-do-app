import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxMainComp } from './ngrx-main-comp';

describe('NgrxMainComp', () => {
  let component: NgrxMainComp;
  let fixture: ComponentFixture<NgrxMainComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxMainComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxMainComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
