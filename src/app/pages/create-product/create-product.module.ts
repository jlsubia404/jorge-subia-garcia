import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { CreateProductRoutingModule } from './create-product-routing.module';
import { CreateProductPage } from './create-product.page';
import { ProductManagerModule } from '../../shared/modules/product-manager/product-manager.module';



@NgModule({
  declarations: [
    CreateProductPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CreateProductRoutingModule,
    ComponentsModule,
    ProductManagerModule
  ]
})
export class CreateProductModule { }
