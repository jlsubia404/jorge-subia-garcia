import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductPage } from './create-product.page';

const routes: Routes = [
    { path: '', component: CreateProductPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateProductRoutingModule { }
