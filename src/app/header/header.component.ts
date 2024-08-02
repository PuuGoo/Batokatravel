import { Component, inject, Input, Renderer2 } from '@angular/core';
import { Catelogy, Order, Product } from '../db';
import { CommonModule, NgForOf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Input() catelogy!: Catelogy[];
  isLogin: string | null = '';
  userService: UserService = inject(UserService);
  productService: ProductService = inject(ProductService);
  products: Product[] = [];
  filterItems: Product[] = [];
  orders: Order[] = [];
  orderService: OrderService = inject(OrderService);

  applyFormSearch: FormGroup = new FormGroup({
    keysearch: new FormControl(''),
  });

  test: boolean = true;

  onChange(): void {
    this.filterItems = this.products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(this.applyFormSearch.value.keysearch.toLowerCase())
    );
    console.log(this.filterItems);
  }


  
  constructor(private router: Router, private render: Renderer2) {
    this.productService.getAllProducts().then((products) => {
      this.products = products;
    });

    this.orderService.getAllOrder().then((orders) => {
      this.orders = orders;
      console.log(orders);     
    })

    // this.render.listen('window', 'click', (e:Event) => {
    //   console.log(e);
      
    // })
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('signin');
  }
}
