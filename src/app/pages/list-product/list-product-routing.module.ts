import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductPage } from './list-product.page';

const routes: Routes = [
    { path: '', component: ListProductPage }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListProductRoutingModule { }
