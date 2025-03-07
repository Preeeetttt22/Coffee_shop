import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Product, CartItem } from './app/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px;">
      <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <a href="#" style="color: black; text-decoration: none;"><h1>San Francisco Coffee Co.</h1></a>
        <button 
          (click)="showCart = !showCart"
          style="padding: 8px 16px; background-color:rgb(218, 187, 35); color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Cart ({{cartItems.length}})
        </button>
      </header>

      <div *ngIf="!showCart" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px;">
        <div *ngFor="let product of products" style="border: 1px solid #ddd; padding: 15px; border-radius: 8px;">
          <img [src]="product.image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px;">
          <h3>{{product.name}}</h3>
          <p>{{product.description}}</p>
          <p style="font-weight: bold;">\${{product.price}}</p>
          <button 
            (click)="addToCart(product)"
            style="width: 100%; padding: 8px; background-color:rgb(218, 187, 35); color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div *ngIf="showCart" style="padding: 20px;">
        <h2>Shopping Cart</h2>
        <div *ngIf="cartItems.length === 0">
          <p>Your cart is empty</p>
        </div>
        <div *ngFor="let item of cartItems" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
          <div>
            <h3>{{item.product.name}}</h3>
            <p>Quantity: {{item.quantity}}</p>
            <p>Price: \${{item.product.price * item.quantity}}</p>
          </div>
          <button 
            (click)="removeFromCart(item.product.id)"
            style="padding: 8px; background-color: #ff4444; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Remove
          </button>
        </div>
        <div *ngIf="cartItems.length > 0" style="margin-top: 20px;">
          <h3>Total: \${{calculateTotal()}}</h3>
          <button 
            (click)="checkout()"
            style="padding: 12px 24px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    <footer style="background-color: #333; color: white; padding: 40px 20px; margin-top: auto;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px;">
          <div>
            <h3 style="margin-bottom: 15px;">About Us</h3>
            <p>Your trusted source for quality products at great prices. We're committed to providing the best shopping experience.</p>
          </div>
          <div>
            <h3 style="margin-bottom: 15px;">Quick Links</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 8px;"><a href="#" style="color: white; text-decoration: none;">Home</a></li>
              <li style="margin-bottom: 8px;"><a href="#" style="color: white; text-decoration: none;">Products</a></li>
              <li style="margin-bottom: 8px;"><a href="#" style="color: white; text-decoration: none;">Contact</a></li>
              <li style="margin-bottom: 8px;"><a href="#" style="color: white; text-decoration: none;">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 style="margin-bottom: 15px;">Contact Info</h3>
            <p style="margin-bottom: 8px;">Email: preet220704&#64;gmail.com</p>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: 8px;"><a href="#" style="color: white; text-decoration: none;">Linkedin</a></li>
              <li style="margin-bottom: 8px;"><a href="#" style="color: white; text-decoration: none;">Github</a></li>
              <li style="margin-bottom: 8px;"><a href="#" style="color: white; text-decoration: none;">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #555;">
          <p>&copy; 2025 San Francisco Coffee Co. All rights reserved. Designed by PD</p>
        </div>
      </footer>
  `
})
export class App implements OnInit {
  products: Product[] = [];
  cartItems: CartItem[] = [];
  showCart = false;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.dataService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }

  addToCart(product: Product) {
    this.dataService.addToCart(product);
  }

  removeFromCart(productId: number) {
    this.dataService.removeFromCart(productId);
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  checkout() {
    this.dataService.checkout(this.cartItems).subscribe(
      response => {
        alert('Order placed successfully!');
        this.cartItems = [];
        this.showCart = false;
      },
      error => {
        alert('Error placing order. Please try again.');
      }
    );
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});