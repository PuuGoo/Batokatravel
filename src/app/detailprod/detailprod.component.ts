import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order, Product } from '../db';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-detailprod',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detailprod.component.html',
  styleUrl: './detailprod.component.css',
  providers: [],
})
export class DetailprodComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productById: Product | undefined;
  productService: ProductService = inject(ProductService);
  orderService: OrderService = inject(OrderService);
  idProd: number = -1;
  orders: Order[] = [];
  idOrder: number = -1;

  orderApply: FormGroup = new FormGroup({
    quantity: new FormControl(1),
  });

  orderSubmit() {
    console.log(
      this.orders.filter((order) => order.idProd.id == this.idProd).length !== 0
    );
    console.log(this.idProd);

    if (
      this.orders.filter((order) => order.idProd.id == this.idProd).length === 0
    ) {
      // 0: chua co
      this.orderService
        .addOrder(
          Object.assign({}, this.productById),
          Number(this.orderApply.value.quantity)
        )
        .subscribe((res) => {
          console.log('Add order successfully!');
          console.log(res);
        });
      console.log(this.orders);
      this.router.navigateByUrl('/cart');
    } else {
      this.idOrder = this.orders.filter(
        (order) => order.idProd.id == this.idProd
      )[0].id;
      let quantity = this.orders.filter(
        (order) => order.idProd.id == this.idProd
      )[0].quantity;
      console.log(this.idOrder);
      console.log(this.orderApply.value.quantity);

      this.orderService
        .updateOrder(
          this.idOrder,
          Number(this.orderApply.value.quantity) + Number(quantity)
        )
        .subscribe((res) => {
          console.log(res);
        });
      this.router.navigateByUrl('/cart');
    }

    this.orderService.getAllOrder().then((orders) => {
      this.orders = orders;
      this.orderService.orders = orders;
    });
  }

  constructor(private router: Router) {
    this.idProd = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(this.idProd).then((result) => {
      this.productById = result;
      console.log(this.productById);
    });
    this.orderService.getAllOrder().then((orders) => {
      this.orders = orders;
    });

    window.scrollTo(0,0);
  }

 

}
