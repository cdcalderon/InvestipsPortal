import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../core/app-config.token';
import { AppConfig } from '../core/app-config';
import { AddressResults } from 'models/address-results';

@Injectable()
export class AddressClient {
    constructor(@Inject(APP_CONFIG) private config: AppConfig, private http: HttpClient) {}

    public getAddressFromZipcode(zipcode: string | number): Observable<AddressResults> {
        const url = `${this.config.addressApi.url}/maps/api/geocode/json?address=${zipcode}&components=country:US&key=${this.config.addressApi.apiKey}`;
        return this.http.get<AddressResults>(url);
    }
}
