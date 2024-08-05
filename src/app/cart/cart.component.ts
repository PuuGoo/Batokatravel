import { Component, Renderer2, inject, signal } from '@angular/core';
import { Order, Product } from '../db';
import { OrderService } from '../services/order.service';
import {
  CommonModule,
  NgFor,
  NgForOf,
  registerLocaleData,
} from '@angular/common';
import { ProductService } from '../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);
import express from 'express';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  orders: Order[] = [];
  orderService: OrderService = inject(OrderService);
  productService: ProductService = inject(ProductService);
  prods: object[] = [];
  route: ActivatedRoute = inject(ActivatedRoute);
  idOrder: number = -1;
  totalPrice = 0;
  subtasks: any = [];
  task: Array<Object> = [];


  deleteCart(event: any) {
    this.idOrder = event.target?.id;

    this.orderService.deleteOrder(this.idOrder).subscribe((res) => {
      // console.log('Delete Successfully!');
      // localStorage.setItem('isLoaded', 'true');
      // this.router.navigateByUrl('/cart');
    });

    this.orderService.getAllOrder().then((orders) => {
      this.orderService.orders = orders;
      this.router.navigateByUrl('/cart');
    });
  }

  ngOnInit() {
    console.log(this.task);
    
  }

  constructor(private router: Router, private render: Renderer2) {
    this.orderService.getAllOrder().then((orders) => {
      this.orders = orders;
      this.orderService.orders = orders;
      this.orders.map((e) => {
        this.totalPrice += e.idProd?.price * e.quantity;
        // console.log(e.idProd.price);
        // console.log(e.quantity);
        // console.log(this.totalPrice);
      });

      
      this.orders.forEach((e) => {
        this.task.push(Object.assign({
          ...e,
          completed: false
        }))
      })

      console.log(this.task);
      
    });
  }
}
