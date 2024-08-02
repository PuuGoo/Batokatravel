import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductCartComponent } from '../product-cart/product-cart.component';
import { ProductService } from '../services/product.service';
import { Catelogy, Product } from '../db';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CatelogyService } from '../services/catelogy.service';
import { RouterModule } from '@angular/router';
import { windowCount } from 'rxjs';

@Component({
  selector: 'app-catelogies',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ProductCartComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './catelogies.component.html',
  styleUrl: './catelogies.component.css',
})
export class CatelogiesComponent {
  productService: ProductService = inject(ProductService);
  products: Product[] = [];
  filteredProducts: Product[] = [];
  checkboxKeyCountry: string[] = [];
  checkboxKeyCity: string[] = [];
  catelogyService: CatelogyService = inject(CatelogyService);
  catelogy: Catelogy[] = [];

  applyFilter: FormGroup = new FormGroup({
    keyword: new FormControl('1'),
  });

  calCharString(keyword: string) {
    const a = keyword.trim().split('');
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += a[i].charCodeAt(0);
    }
    return sum;
  }

  filters() {
    switch (this.applyFilter.value.keyword) {
      case '1':
        console.log('Sắp xếp theo tên A-Z');
        this.filteredProducts = this.products
          .filter((product) => product.name)
          .sort((a, b) => {
            return this.calCharString(a.name) - this.calCharString(b.name);
          });
        console.log(this.filteredProducts);

        break;
      case '2':
        console.log('Sắp xếp theo tên Z-A');
        this.filteredProducts = this.products
          .filter((product) => product.name)
          .sort((a, b) => {
            return this.calCharString(b.name) - this.calCharString(a.name);
          });
        console.log(this.filteredProducts);

        break;
      case '3':
        console.log('Sắp xếp giá tăng dần');
        this.filteredProducts = this.products
          .filter((product) => product.price)
          .sort((a, b) => a.price - b.price);
        console.log(this.filteredProducts);

        break;
      case '4':
        console.log('Sắp xếp giá giảm dần');
        this.filteredProducts = this.products
          .filter((product) => product.price)
          .sort((a, b) => b.price - a.price);
        console.log(this.filteredProducts);

        break;
      case '5':
        console.log('Sắp xếp sản phẩm nổi bật');
        this.filteredProducts = this.products.filter(
          (product) => product.isFeatured
        );
        console.log(this.filteredProducts);

        break;
      case '6':
        console.log('Sắp xếp sản phẩm phổ biến');
        this.filteredProducts = this.products.filter(
          (product) => product.isPopular
        );
        console.log(this.filteredProducts);

        break;
      case '7':
        console.log('Sắp xếp sản phẩm giảm giá');
        this.filteredProducts = this.products.filter(
          (product) => product.isSale
        );
        console.log(this.filteredProducts);

        break;

      default:
        break;
    }
  }

  applyCheckbox: FormGroup = new FormGroup({
    checkbox: new FormControl(''),
  });

  checkboxCountry(event: any) {
    if (event.target.checked) {
      // console.log(event.target.value);
      this.checkboxKeyCountry.push(event.target.value);
    } else {
      this.checkboxKeyCountry.splice(
        this.checkboxKeyCountry.indexOf(event.target.value),
        1
      );
    }
    // console.log(this.checkboxKeyCountry);
    // console.log(
    //   this.checkboxKeyCountry.length === 0 &&
    //     this.filteredProducts.length !== this.products.length
    // );

    if (
      this.checkboxKeyCountry.length === 0 &&
      this.checkboxKeyCity.length === 0 &&
      this.filteredProducts.length !== this.products.length
    ) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product) => {
        for (let i = 0; i < this.checkboxKeyCountry.length; i++) {
          const element = this.checkboxKeyCountry[i];
          if (product.name.toLowerCase().includes(element?.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
    console.log(this.filteredProducts);
  }

  checkboxCity(event: any) {
    if (event.target.checked) {
      // console.log(event.target.value);
      this.checkboxKeyCity.push(event.target.value);
    } else {
      this.checkboxKeyCity.splice(
        this.checkboxKeyCity.indexOf(event.target.value),
        1
      );
    }
    // console.log(this.checkboxKeyCity);
    // console.log(
    //   this.checkboxKeyCity.length === 0 &&
    //     this.filteredProducts.length !== this.products.length
    // );

    if (
      this.checkboxKeyCity.length === 0 &&
      this.filteredProducts.length !== this.products.length
    ) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product) => {
        for (let i = 0; i < this.checkboxKeyCity.length; i++) {
          const element = this.checkboxKeyCity[i];
          if (product.location.toLowerCase().includes(element?.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
    console.log(this.filteredProducts);
  }

  constructor() {
    this.productService.getAllProducts().then((products) => {
      this.products = products;
      this.filteredProducts = products;

      console.log(
        products
          .filter((product) => product.price)
          .sort((a, b) => a.price - b.price)
      );
    });

    this.catelogyService.getAllCatelogies().then((cats) => {
      this.catelogy = cats;
    });

    window.scrollTo(0,0);
  }
}
