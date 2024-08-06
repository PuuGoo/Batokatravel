import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../db';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url = 'http://localhost:3000/orders';
  orders: Order[] = [];

  addOrder(idProd: object, quantity: number, completed?: boolean) {
    return this.http.post(this.url, {
      idProd: idProd,
      quantity: quantity,
      completed: false,
    });
  }

  updateOrder(idOrder: number, quantity: number, completed?: boolean) {
    return this.http.patch(`${this.url}/${idOrder}`, {
      quantity: quantity,
      completed: completed
    });
  }

  deleteOrder(idOrder: number) {
    return this.http.delete(`${this.url}/${idOrder}`);
  }

  async getAllOrder(): Promise<Order[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? {};
  }

  constructor(private http: HttpClient) {}
}
