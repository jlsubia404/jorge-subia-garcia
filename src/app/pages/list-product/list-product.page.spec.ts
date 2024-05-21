import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductPage } from './list-product.page';

describe('ListProductComponent', () => {
  let component: ListProductPage;
  let fixture: ComponentFixture<ListProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductPage]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
