import { AddressComponent } from './address-component';

export interface AddressResults {
  // eslint-disable-next-line @typescript-eslint/naming-convention
    results: [{ address_components: AddressComponent[] }];
}
