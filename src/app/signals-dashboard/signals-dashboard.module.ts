import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalsDashboardComponent } from './signals-dashboard.component';
import { SignalDashboardRoutingModule } from './signals-dashboard-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { WeeklyZigZagSignalService } from '@app/service/restServices/weekly-zig-zag-signal.service';

@NgModule({
    declarations: [SignalsDashboardComponent],
    imports: [SignalDashboardRoutingModule, CommonModule, SharedModule],
    providers: [WeeklyZigZagSignalService],
})
export class SignalsDashboardModule {}
