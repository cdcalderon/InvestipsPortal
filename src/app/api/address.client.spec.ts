import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from '@app/core';
import { of } from 'rxjs';
import { AddressClient } from './address.client';
import { AddressResults } from 'models/address-results';

describe('ApplicationClient', () => {
    let service: AddressClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: APP_CONFIG,
                    useValue: {
                        logging: {
                            minimumLevel: 'debug',
                        },
                        addressApi: {
                            url: 'https://maps.googleapis.com',
                            apiKey: 'abc123-123456',
                        },
                    },
                },
                AddressClient,
            ],
        });
        service = TestBed.inject(AddressClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /* eslint-disable @typescript-eslint/naming-convention */
    it('should get address', async (done) => {
        const address: AddressResults = {
            results: [
                {
                    address_components: [
                        {
                            long_name: 'Winnetka',
                            short_name: 'Winnetka',
                            types: ['locality', 'political'],
                        },
                        {
                            long_name: 'New Trier',
                            short_name: 'New Trier',
                            types: ['administrative_area_level_2', 'political'],
                        },
                        {
                            long_name: 'Cook County',
                            short_name: 'Cook County',
                            types: ['administrative_area_level_1', 'political'],
                        },
                    ],
                },
            ],
        };

        const address$ = of(address);
        spyOn(service, 'getAddressFromZipcode').and.returnValue(address$);

        const expectedAddress: AddressResults = {
            results: [
                {
                    address_components: [
                        {
                            long_name: 'Winnetka',
                            short_name: 'Winnetka',
                            types: ['locality', 'political'],
                        },
                        {
                            long_name: 'New Trier',
                            short_name: 'New Trier',
                            types: ['administrative_area_level_2', 'political'],
                        },
                        {
                            long_name: 'Cook County',
                            short_name: 'Cook County',
                            types: ['administrative_area_level_1', 'political'],
                        },
                    ],
                },
            ],
        };

        service.getAddressFromZipcode('12345').subscribe((addr: AddressResults) => {
            expect(addr).toEqual(expectedAddress);
        });

        done();
    });
});
