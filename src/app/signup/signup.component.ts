import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../db';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  userService: UserService = inject(UserService);
  isPassMatch: boolean = false;
  users: User[] = [];
  message: string = "";

  applySignUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [
      Validators.required,
      this.passwordStrengthValidator as ValidatorFn,
    ]),
    confirmpass: new FormControl('', [Validators.required]),
  });

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

  submitSignUpForm() {
    if (
      this.applySignUpForm.value.pass ===
        this.applySignUpForm.value.confirmpass &&
      this.applySignUpForm.valid &&
      this.users.filter(
        (user) => user.username == this.applySignUpForm.value.email
      ).length === 0
    ) {
      this.userService
        .signUpUser(
          this.applySignUpForm.value.email,
          this.applySignUpForm.value.pass
        )
        .subscribe((res) => console.log(res));
      this._router.navigateByUrl('signin');
    } else {
      if (
        this.users.filter(
          (user) => user.username == this.applySignUpForm.value.email
        ).length === 0
      ) {
        this.message = 'Email đăng ký đã tồn tại.';
      } else {
        this.message = 'Đăng ký đã không thành công.';
      }
    }
  }

  constructor(private _router: Router) {
    this.userService.getAllUsers().then((users) => {
      this.users = users;         
    })
    
  }
}
