import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss']
})
export class CartViewComponent implements OnInit {

  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
	this.cartService.getCartItems().subscribe((data) => {
		this.cartItems = data;
		this.getTotalPrice();
	});
}

	getTotalPrice() {
		this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.price, 0);
	}

	clearCart() {
		this.cartService.clearCart().subscribe();
	}

	checkout(): void {
		alert('Thank you for your order!');
		this.cartService.checkout(this.cartItems).subscribe();
	}
}
