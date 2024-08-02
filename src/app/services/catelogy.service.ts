import { Injectable } from '@angular/core';
import { Catelogy } from '../db';

@Injectable({
  providedIn: 'root',
})
export class CatelogyService {
  url = 'http://localhost:3000/catelogies';
  async getAllCatelogies(): Promise<Catelogy[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? {};
  }
}
