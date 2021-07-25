import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'signals-dashboard',
        pathMatch: 'full',
    },
    {
        path: 'signals-dashboard',
        loadChildren: () => import('./signals-dashboard/signals-dashboard.module').then((m) => m.SignalsDashboardModule),
    },
    {
        path: 'quote-fundamentals',
        loadChildren: () => import('./quote-fundamentals/quote-fundamentals.module').then((m) => m.QuoteFundamentalsModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
