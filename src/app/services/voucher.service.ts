import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  url = "http://localhost:3000/voucher"
  getAllVoucheres() {
    return this.http.get(this.url);
  }

  constructor(private http: HttpClient) { }
}
