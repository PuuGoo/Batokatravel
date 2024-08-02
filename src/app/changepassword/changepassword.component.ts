import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent {
  userService: UserService = inject(UserService);
  applyChangePass: FormGroup = new FormGroup({
    oldpassword: new FormControl('', [
      Validators.required,
      this.passwordStrengthValidator as ValidatorFn,
    ]),
    newpassword: new FormControl('', [
      Validators.required,
      this.passwordStrengthValidator as ValidatorFn,
    ]),
    confirmnewpassword: new FormControl('', [
      Validators.required,
      this.passwordStrengthValidator as ValidatorFn,
    ]),
  });

  constructor(private router: Router) {}

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

  submit() {
    if (
      this.applyChangePass.value.oldpassword ===
        this.userService.user[0]?.password &&
      this.applyChangePass.value.newpassword ===
        this.applyChangePass.value.confirmnewpassword &&
      this.applyChangePass.valid
    ) {
      this.userService
        .updatePassword(this.applyChangePass.value.newpassword)
        .subscribe((res) => {
          console.log(res);
        });
      this.userService.logout();
      this.router.navigateByUrl('/signin');
    } else {
      console.log('Doi mat khau sai');
    }
  }
}
