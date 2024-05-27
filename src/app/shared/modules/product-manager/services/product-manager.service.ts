import { Injectable } from "@angular/core";
import { ApiConnectorService } from "../../api-connector/services/api-connector.service";
import { Product } from "../interfaces/product.interface";
import { mergeMap } from "rxjs";

@Injectable()
export class ProductManagerService {

    private CONTEXT_GET_PRODUCT_LIST = '/ipf-msa-productosfinancieros/bp/products';
    private CONTEXT_VALIDATE_ID = '/ipf-msa-productosfinancieros/bp/products/verification';
    private CONTEXT_CREATE_PRODUCT = '/ipf-msa-productosfinancieros/bp/products';
    constructor(private apiConnector: ApiConnectorService) {

    }

    getProductList() {
        return this.apiConnector.getAPI(this.CONTEXT_GET_PRODUCT_LIST);
    }

    saveProduct(product: Product) {
        return this.apiConnector.getAPI<boolean>(`${this.CONTEXT_VALIDATE_ID}?id=${product.id}`).pipe(
            mergeMap((exists) => {
                if (exists) {
                    throw Error('Id ya existe.')
                }
                return this.apiConnector.postAPI(this.CONTEXT_CREATE_PRODUCT, {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    logo: product.logo,
                    date_release: product.releaseDate,
                    date_revision: product.revisionDate
                });
            })
        )
    }

}
