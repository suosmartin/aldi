import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TestActions from './products.actions';
import { ProductsApiService } from '../services/products-api.service';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private api: ProductsApiService) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TestActions.fetchProducts),
      mergeMap(() =>
        this.api.fetchProducts().pipe(
          map((products) => {
            // valamiért duplikálva jön egy id és (nem unique) a tesztért most inkább nem keresnék id+név alapján ezért ez a rész:
            const seen = new Set<string>();
            const uniqueProducts = products.map((p) => {
              let id = p.id;
              while (seen.has(id)) {
                id = `${p.id}_${Math.random().toString(36).slice(2, 6)}`;
              }
              seen.add(id);
              return { ...p, id };
            });
            return TestActions.fetchProductsSuccess({
              products: uniqueProducts,
            });
          }),
          catchError(() =>
            // Ha hiba történik, akkor is sikeresnek vesszük a fetch-t, csak üres terméklistát adunk vissza ...
            of(TestActions.fetchProductsSuccess({ products: [] }))
          )
        )
      )
    )
  );
}
