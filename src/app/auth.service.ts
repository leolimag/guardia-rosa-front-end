import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service';

@Injectable()
export class AuthService {
  constructor(private router: Router, private http: HttpClient, private userService: UserService) {}

  //private apiUrl = 'http://localhost:8082/api/auth/login';
  private apiUrl = 'https://abraco-rosa-17121aee456e.herokuapp.com/api/auth/login';

  login(email: string, password: string) {
    console.log(this.apiUrl);
    
    return this.http.post(this.apiUrl, { email, password });
  }

  redirectToLogin() {
    localStorage.removeItem('user');
    this.router.navigate(["/login"])
  }

  deleteAccount() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }

  isAuthenticated(): boolean {    
    return this.userService.getUserToken() ? true : false;
  } 
}