import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../core/app-config.token';
import { AppConfig } from '../core/app-config';

@Injectable()
export class EodHistoricalDataService {
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {}

    public getQuote(searchTerm: string): Observable<any> {
        const url = `${this.config.eodhistoricaldataApi.url}/api/Function2?searchTerm=${searchTerm}`;
        return this.http.get<any>(url);
    }
}
