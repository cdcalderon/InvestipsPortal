import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { SharedModule } from '@app/shared/shared.module';
import { QuoteFundamentalsRoutingModule } from './quote-fundamentals-routing.module';

@NgModule({
    declarations: [QuoteDetailsComponent],
    imports: [QuoteFundamentalsRoutingModule, CommonModule, SharedModule],
})
export class QuoteFundamentalsModule {}
