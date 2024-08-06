import { Component, Renderer2, computed, inject, signal } from '@angular/core';
import { Order, Product, Voucher } from '../db';
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
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VoucherService } from '../services/voucher.service';

export interface Subtask {
  completed: boolean;
  order: Order;
}

export interface Task {
  completed: boolean;
  subtasks?: Order[];
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
  task = signal<Task>({
    completed: false,
    subtasks: [],
  });
  vouchers: Voucher[] = [];
  voucherService: VoucherService = inject(VoucherService);
  voucher: number = 0;

  // Chức năng xóa giỏ hàng
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

  // Xử lý checkbox
  // Hiển thị trạng thái click 1 trong các thành phần con
  partiallyCompleted = () => {
    let task = this.task();
    if (!task.subtasks) {
      return false;
    }

    // console.log(task.subtasks.some((t) => t.completed));

    return (
      task.subtasks.some((t) => t.completed) &&
      !task.subtasks.every((t) => t.completed)
    );
  };
  // Cập nhật trạng thái checkbox
  update(event: any, index?: number) {
    let completed = event.target.checked;
    console.log(completed);

    if (index === undefined) {
      this.task().completed = completed;
      this.task().subtasks?.forEach((t) => (t.completed = completed));
      console.log(this.task().subtasks);
    } else {
      this.task().subtasks![index].completed = completed;
      this.task().completed =
        this.task().subtasks?.every((t) => t.completed) ?? true;
      this.orderService
        .updateOrder(
          this.task().subtasks![index].id,
          this.task().subtasks![index].quantity,
          completed
        )
        .subscribe((res) => {
          console.log('Cập nhật thành công!');
        });
    }

    this.calTotalPrice();
    console.log(this.totalPrice);
  }
  // Show/hide bảng tóm tắt
  summary() {
    return this.task().subtasks?.some((t) => t.completed) ?? true;
  }

  // Xử lý tăng giảm số lượng
  // Chức năng tăng số lượng
  incrementQuantity(index: number) {
    this.task().subtasks![index].quantity += 1;
    this.calTotalPrice();
    this.orderService
      .updateOrder(
        this.task().subtasks![index].id,
        this.task().subtasks![index].quantity
      )
      .subscribe((res) => {
        console.log('Update quantity successfully!');
      });
  }
  // Chức năng giảm số lượng
  decrementQuantity(index: number) {
    this.task().subtasks![index].quantity -= 1;
    this.calTotalPrice();
    this.orderService
      .updateOrder(
        this.task().subtasks![index].id,
        this.task().subtasks![index].quantity
      )
      .subscribe((res) => {
        console.log('Update quantity successfully!');
      });
  }

  // Tính tổng giá tiền
  calTotalPrice() {
    this.totalPrice = 0;
    this.task()
      .subtasks?.filter((t) => t.completed)
      .forEach((t) => {
        this.totalPrice += t.quantity * t.idProd.price;
      });
  }

  applyVoucher: FormGroup = new FormGroup({
    voucherValue: new FormControl(null),
  });

  submitVoucher() {
    let voucherCode = this.applyVoucher.value.voucherValue;
    this.voucher =
      this.vouchers.filter((v) => v.name === voucherCode)[0]?.value ?? 0;
    return this.voucher;
  }

  constructor(private router: Router, private render: Renderer2) {
    this.orderService.getAllOrder().then((orders) => {
      this.orders = orders;
      this.orderService.orders = orders;
      this.orders.forEach((e) => {
        this.task().subtasks?.push({
          ...e,
        });
      });
      if (this.task().subtasks?.every((t) => t.completed)) {
        this.task().completed = true;
      }
      console.log(this.task().subtasks);
      this.calTotalPrice();
    });

    this.voucherService.getAllVoucheres().subscribe((res) => {
      this.vouchers = Object.assign(res);
      console.log('Lấy tất cả voucher thành công');
      console.log(res);
    });
  }
}
