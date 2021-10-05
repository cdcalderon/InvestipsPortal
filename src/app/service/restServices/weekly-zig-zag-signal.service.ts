import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@app/core';
import { IDisplaySignalSignal } from 'models/display-signal';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WeeklyZigZagSignalService {
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {}

    public getPublishedZigzagSignals(): Observable<IDisplaySignalSignal> {
        const url = `${this.config.investipsApiGatewayBase.url}/api/weeklyZigzagFibPremiumSignal`;
        return this.http.get<IDisplaySignalSignal>(url);
    }
}
