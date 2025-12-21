import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterilaDesigns } from './materila-designs';

describe('MaterilaDesigns', () => {
  let component: MaterilaDesigns;
  let fixture: ComponentFixture<MaterilaDesigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterilaDesigns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterilaDesigns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
