import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';

const routes: Routes = [
    {
        path: '',
        component: QuoteDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuoteFundamentalsRoutingModule {}
