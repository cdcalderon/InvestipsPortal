import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsDashboardComponent } from './signals-dashboard.component';
import { SignalDashboardRoutingModule } from './signals-dashboard-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
    declarations: [SignalsDashboardComponent],
    imports: [SignalDashboardRoutingModule, CommonModule, SharedModule],
})
export class SignalsDashboardModule {}
