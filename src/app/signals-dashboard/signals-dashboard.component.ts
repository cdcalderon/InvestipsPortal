import { Component, OnInit } from '@angular/core';
import { AddressClient } from '@app/api/address.client';
import { EodHistoricalDataService } from '@app/api/eod-historical-data.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-signals-dashboard',
    templateUrl: './signals-dashboard.component.html',
    styleUrls: ['./signals-dashboard.component.scss'],
})
export class SignalsDashboardComponent implements OnInit {
    constructor(private addressClient: AddressClient, private quoteService: EodHistoricalDataService) {}

    ngOnInit(): void {
        //Just testing API, this has to be removed
        this.addressClient
            .getAddressFromZipcode(75013)
            .pipe(tap((x) => console.log))
            .subscribe();

        this.quoteService.getQuote('MSFT').subscribe();

        let variable;

        const result = variable;
    }
}
