import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemResponse } from './item.response';

@Injectable()
export class MarketplaceClient {
    constructor() {}

    public getItems(): Observable<ItemResponse[]> {
        const items: ItemResponse[] = [];
        for (let i = 0; i < 10; i++) {
            items.push({
                itemId: i,
                name: 'Pineapple ' + i,
                description: 'temp',
                imageUrl: 'temp',
            });
        }

        return of(items);
    }
}
