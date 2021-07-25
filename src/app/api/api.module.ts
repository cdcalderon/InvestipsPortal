import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceClient } from './marketplace.client';
import { AddressClient } from './address.client';
import { EodHistoricalDataService } from './eod-historical-data.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [MarketplaceClient, AddressClient, EodHistoricalDataService],
})
export class ApiModule {}
