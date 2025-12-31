import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompDialog } from './my-comp-dialog';

describe('MyCompDialog', () => {
  let component: MyCompDialog;
  let fixture: ComponentFixture<MyCompDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCompDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCompDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
