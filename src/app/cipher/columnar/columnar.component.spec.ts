import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnarComponent } from './columnar.component';

describe('ColumnarComponent', () => {
  let component: ColumnarComponent;
  let fixture: ComponentFixture<ColumnarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
