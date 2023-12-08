import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private apiUrl = environment.apiUrl;
  private apiCheckoutUrl = `${environment.apiUrl}/checkout`;

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/cart`);
  }

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/cart`, product);
  }

  clearCart(): Observable<object> {
    return this.http.delete<object>(`${this.apiUrl}/cart`);
  }

  checkout(products: Product[]): Observable<object> {
    return this.http.post<object>(`${this.apiCheckoutUrl}`, products);
  }

}
