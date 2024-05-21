import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProductPage } from './list-product.page';
import { ApiConnectorService } from '../../shared/modules/api-connector/services/api-connector.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';

class MockApiConnectorService {
  getAPI() {
    return of([{ name: 'Product 1' }, { name: 'Product 2' }]);
  }
}

describe('ListProductPage', () => {
  let component: ListProductPage;
  let fixture: ComponentFixture<ListProductPage>;
  let apiConnectorService: ApiConnectorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListProductPage],
      imports: [FormsModule, ComponentsModule],
      providers: [
        { provide: ApiConnectorService, useClass: MockApiConnectorService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProductPage);
    component = fixture.componentInstance;
    apiConnectorService = TestBed.inject(ApiConnectorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch products on init', () => {
    fixture.detectChanges(); // triggers ngOnInit
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
    expect(component.isLoading).toBeFalsy();
  });

  it('should filter products based on search query', () => {
    component.products = [{ name: 'Product 1' }, { name: 'Product 2' }];
    component.search('product 1');
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].name).toBe('Product 1');
  });



  it('should handle API errors gracefully', () => {
    jest.spyOn(apiConnectorService, 'getAPI').mockReturnValue(throwError(() => new Error('API Error')));
    fixture.detectChanges(); // triggers ngOnInit
    expect(component.showError).toBeTruthy();
    expect(component.errorMessage).toBe('Comunicación no disponnible.');
  });
});
