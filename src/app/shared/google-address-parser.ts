import { Address } from 'models/address';
import { AddressComponent } from 'models/address-component';

export class GoogleAddressParser {
    private address: Address = {};

    // eslint-disable-next-line @typescript-eslint/naming-convention
    constructor(private address_components: Array<AddressComponent>) {
        this.parseAddress();
    }

    result(): Address {
        return this.address;
    }

    private parseAddress() {
        if (!Array.isArray(this.address_components)) {
            throw Error('Address Components is not an array');
        }

        if (!this.address_components.length) {
            throw Error('Address Components is empty');
        }

        for (const component of this.address_components) {
            if (this.isCity(component)) {
                this.address.city = component.long_name;
            }

            if (this.isCountry(component)) {
                this.address.country = component.long_name;
            }

            if (this.isState(component)) {
                this.address.state = component.long_name;
            }
        }
    }

    private isCity(component: AddressComponent): boolean {
        return component.types.includes('locality');
    }

    private isState(component: AddressComponent): boolean {
        return component.types.includes('administrative_area_level_1');
    }

    private isCountry(component: AddressComponent): boolean {
        return component.types.includes('country');
    }
}
