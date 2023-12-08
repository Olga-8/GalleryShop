import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';
  categories: string[] = ['price-asc', 'price-desc', 'name-asc', 'name-desc'];
  selectedCategory: string = '';
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('categorySelect') categorySelect!: ElementRef;
  

  constructor(private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
    ) { }

    ngOnInit(): void {
      this.productService.getProducts()
      .subscribe((products) => {
        this.products = products;
        this.filteredProducts = products;
      });
    }

    addToCart(product: Product): void {
      this.cartService.addToCart(product).subscribe({
        next: () => {
          this.snackbar.open(`${product.name} added to cart`, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        error: (err) => {
          this.snackbar.open(`Error adding ${product.name} to cart`, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });

        }
      });
    }

    applyFilter(event: Event): void {
      const filterValue = this.inputField.nativeElement.value.trim().toLowerCase();

      this.filteredProducts = this.products.filter((product) => {
        return product.name.toLowerCase().includes(filterValue);
      });

      this.sortProducts(this.sortOrder);
    }

    clearInputField(): void {
      this.sortOrder = '';
      this.inputField.nativeElement.value = '';
      this.selectedCategory = ''; // Обнуление выбранной категории
      this.filteredProducts = [...this.products];
    }

    sortProducts(sortBy: string): void {
      
      this.sortOrder = sortBy;

      if (this.sortOrder === 'price-asc') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (this.sortOrder === 'price-desc') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (this.sortOrder === 'name-asc') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (this.sortOrder === 'name-desc') {
        this.filteredProducts = this.filteredProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
    }

}