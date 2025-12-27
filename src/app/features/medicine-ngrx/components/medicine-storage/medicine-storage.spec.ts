import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineStorage } from './medicine-storage';

describe('MedicineStorage', () => {
  let component: MedicineStorage;
  let fixture: ComponentFixture<MedicineStorage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineStorage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineStorage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
