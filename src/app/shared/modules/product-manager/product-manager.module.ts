import { NgModule } from '@angular/core';
import { ApiConnectorModule } from '../api-connector/api-connector.module';
import { ProductManagerService } from './services/product-manager.service';


@NgModule({
    imports: [
    ],
    providers: [
        ProductManagerService
    ],

})
export class ProductManagerModule {


}