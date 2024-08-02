import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { User } from '../db';
import { Router, RouterModule } from '@angular/router';
import { LoginType, UserService } from '../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  providers: [],
})
export class SigninComponent {
  userService: UserService = inject(UserService);
  isCheckLogin = '';
  users: User[] = [];
  message: string = '';

  submitSignInForm() {
    this.userService.getAllUsers().then((users) => {
      const foundUser = users.filter((user) => {
        return (
          user.username == this.applySignInForm.value.email &&
          user.password == this.applySignInForm.value.pass
        );
      });
      if (foundUser.length !== 0) {
        this.userService.login(foundUser, LoginType.Login);
        this._router.navigateByUrl('');
      } else {
        if (
          this.users.filter(
            (user) => user.username == this.applySignInForm.value.email
          ).length === 0
        ) {
          this.message = 'Email không tồn tại.';
        } else {
          this.message = 'Đăng nhập không thành công.';
        }
      }
    });
  }

  applySignInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [
      Validators.required,
      this.passwordStrengthValidator as ValidatorFn,
    ]),
  });

  // applySignInForm: FormGroup = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   pass: new FormControl('', [
  //     Validators.required,
  //     Validators.pattern(
  //       '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*W)(?!.* ).{6,12}$'
  //     ),
  //   ]),
  // });

  passwordStrengthValidator(control: AbstractControl) {
    const password: string = control.value;

    if (!password) return;

    const hasNumber = /[0-9]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);

    const valid =
      hasNumber && hasUpper && hasLower && hasSymbol && password.length >= 12;
    return valid ? null : { passwordStrength: true };
  }

  // checkLogin(username: string, password: string) {
  //   const foundUser = this.userService.getAllUsers().then((users) => {
  //     users.filter((user) => {
  //       return user.username == username && user.password == password;
  //     });
  //   });
  //   return foundUser;
  // }
  constructor(private _router: Router) {
    this.userService.getAllUsers().then((users) => {
      this.users = users;
    });
  }
}
