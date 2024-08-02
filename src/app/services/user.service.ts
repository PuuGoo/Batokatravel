import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../db';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users';
  user: User[] = [];

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? {};
  }

  submitApplication(email: string, pass: string) {
    console.log(`Form Sign In received date : ${email} - ${pass}`);
  }

  constructor(private http: HttpClient) {}

  signUpUser(email: string, pass: string) {
    return this.http.post(this.url, {
      username: email,
      password: pass,
      role: "user"
    });
  }

  userLogin = new BehaviorSubject<LoginType | undefined>(LoginType.NotLogin);

  login(foundUser: User[], userType: LoginType) {
    this.userLogin.next(userType);
    this.user = foundUser;
  }

  logout() {
    this.userLogin.next(LoginType.NotLogin);
    this.user = [];
  }

  updatePassword(newpassword: string) {
    return this.http.patch(`${this.url}/${this.user[0]?.id}`, {
      password: newpassword,
      role: this.user[0]?.role, 
    });
  }
}

export enum LoginType { //enum in typesript định nghĩa các hằng số
  NotLogin,
  Login,
}
