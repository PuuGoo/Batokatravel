import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatelogiesComponent } from './catelogies/catelogies.component';
import { AddressShippingComponent } from './address-shipping/address-shipping.component';
import { BlogComponent } from './blog/blog.component';
import { BlogdetailComponent } from './blogdetail/blogdetail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutmethodComponent } from './checkoutmethod/checkoutmethod.component';
import { ContactComponent } from './contact/contact.component';
import { DetailprodComponent } from './detailprod/detailprod.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { inject } from '@angular/core';
import { LoginType, UserService } from './services/user.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OrderService } from './services/order.service';
import { Order } from './db';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckboxOverviewExampleComponent } from './components/checkbox-overview-example/checkbox-overview-example.component';

export const routes: Routes = [
  {
    path: 'addressShipping',
    component: AddressShippingComponent,
    title: 'Address Shipping page',
  },
  {
    path: 'blog',
    component: BlogComponent,
    title: 'Blog page',
  },
  {
    path: 'blogdetail',
    component: BlogdetailComponent,
    title: 'Blog detail page',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart page',
  },
  {
    path: 'cart/:id',
    component: CartComponent,
    title: 'Cart page',
  },
  {
    path: 'catelogies',
    component: CatelogiesComponent,
    title: 'Catelogy page',
  },
  {
    path: 'checkoutmethod',
    component: CheckoutmethodComponent,
    title: 'Checkoutmethod page',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact page',
  },
  {
    path: 'detailprod/:id',
    component: DetailprodComponent,
    title: 'Detail prod page',
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    title: 'Forgot Password page',
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
    title: 'Changep Password page',
    canActivate: [
      () => {
        const router: Router = inject(Router);
        const auth = inject(UserService);
        if (auth.userLogin.value == LoginType.Login) {
          return true;
        } else {
          router.navigateByUrl('/signin');
          return false;
        }
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
    canActivate: [() => true],
  },
  {
    path: 'signin',
    component: SigninComponent,
    title: 'Sign in page',
    canActivate: [
      () => {
        const router: Router = inject(Router);
        const auth = inject(UserService);
        if (auth.userLogin.value == LoginType.NotLogin) {
          return true;
        } else {
          router.navigateByUrl('');
          return false;
        }
      },
    ],
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign up page',
  },
  {
    path: 'checkoutSuccess',
    component: CheckoutSuccessComponent,
    title: 'Checkout Successfully page',
  },
  {
    path: 'components/checkbox',
    component: CheckboxOverviewExampleComponent,
    title: 'Checkbox page',
  },
  {
    path: '**',
    component: HomeComponent,
    title: 'Home page',
  },
];
