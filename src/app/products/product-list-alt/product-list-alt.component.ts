import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs';

import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  private errorMessageSubject = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessageSubject.asObservable();

  selectedProduct$ = this.productService.selectedProduct$
  .pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  
  products$ = this.productService.productsWithCategory$
  .pipe(
    catchError(err => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    this.productService.changeSelectedProductId(productId);
  }
}
