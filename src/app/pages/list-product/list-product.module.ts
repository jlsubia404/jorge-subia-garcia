import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { ListProductRoutingModule } from './list-product-routing.module';
import { ListProductPage } from './list-product.page';



@NgModule({
  declarations: [
    ListProductPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    ListProductRoutingModule,
    ComponentsModule
  ]
})
export class ListProductModule { }
