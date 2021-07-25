import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignalDisplayComponent } from '@app/shared/signal-display/signal-display.component';
import { SignalsDashboardComponent } from './signals-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: SignalsDashboardComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SignalDashboardRoutingModule {}
