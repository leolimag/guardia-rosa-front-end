import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  //private apiUrl = 'http://localhost:8082/api/auth/register';
  private apiUrl = 'https://abraco-rosa-17121aee456e.herokuapp.com/api/auth/register';
  userData: any = {};

  constructor(private http: HttpClient) {
  }

  registerUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }
  
  ngOnInit() {}


}
