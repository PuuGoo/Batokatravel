import { Component, inject, NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Catelogy } from './db';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { CatelogyService } from './services/catelogy.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  catelogies: Catelogy[] = [];
  dbService: CatelogyService = inject(CatelogyService);
  isCheckLogin: string = '';




  constructor() {
    this.dbService.getAllCatelogies().then((catelogies: Catelogy[]) => {
      this.catelogies = catelogies;
    });


  }
}
