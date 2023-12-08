import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
@Input() product!: Product;
@Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();

addToCartItem(): void {
  this.addToCart.emit(this.product);
}
}
