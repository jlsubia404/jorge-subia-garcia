import { Component, OnInit } from '@angular/core';
import { ApiConnectorService } from '../../shared/modules/api-connector/services/api-connector.sevice';
import { Subject, debounceTime } from 'rxjs';
import { BasePage } from '../../shared/common/generic/base.page';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrl: './list-product.page.scss'
})
export class ListProductPage extends BasePage implements OnInit {

  products: any;
  filteredProducts: any;
  queryField = '';
  private searchSubject: Subject<string> = new Subject<string>();
  constructor(private apiConnector: ApiConnectorService) {
    super();
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.apiConnector.getAPI('/ipf-msa-productosfinancieros/bp/products').subscribe({
      next: data => {
        this.products = data;
        this.filteredProducts = this.products;
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        //FEAT: se podria dejar marca en APM
        this.showError = true;
        //TODO: logica pa tomar error del backend o en su defecto dejar un error en constante
        this.errorMessage = 'Comunicación no disponnible.'
      }
    });

    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(searchTerm => {
      this.search(searchTerm);
    });
  }
  search(query: string): void {
    this.filteredProducts = this.products.filter((product: any) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  onSearchChange(event: Event): void {
    this.queryField = (event.target as HTMLInputElement).value;
    this.searchSubject.next(this.queryField);
  }
}
