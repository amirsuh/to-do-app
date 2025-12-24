import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryPaginationbyself } from './try-paginationbyself';

describe('TryPaginationbyself', () => {
  let component: TryPaginationbyself;
  let fixture: ComponentFixture<TryPaginationbyself>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TryPaginationbyself]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TryPaginationbyself);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
