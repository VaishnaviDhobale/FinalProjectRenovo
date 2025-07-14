import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductPage } from './single-product-page';

describe('SingleProductPage', () => {
  let component: SingleProductPage;
  let fixture: ComponentFixture<SingleProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
