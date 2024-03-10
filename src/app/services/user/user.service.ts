import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    let user = this.getUser();
    if (user) {
      this.userSubject.next(user);
    }
  }

  user = localStorage.getItem('user');
  //private apiUrl = ' http://localhost:8082';
  private apiUrl = 'https://abraco-rosa-17121aee456e.herokuapp.com';

  private httpOptions = {
    headers: new HttpHeaders()
  };

  activeModoCamuflado() {
    localStorage.setItem("camuflado", "true");
  }

  desactiveModoCamuflado() {
    localStorage.setItem("camuflado", "false");
  }

  getModoCamuflado(): string {
    return String(localStorage.getItem("camuflado"));
  }

  getUser() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  updateUser(userInfo: any): void {    
    localStorage.setItem('user', JSON.stringify(userInfo));
    this.userSubject.next(userInfo);
  }

  private updateHeaders() {
    const user = this.getUser();
    if (user && user.token) {
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${user.token}`);
    }
  }

  getUserToken() {
    let token;
    let user = localStorage.getItem('user')
    if (user) {
      let userJson = JSON.parse(user);
      token = userJson.token;
      return token ? true : false;
    }

    return false;
  }

  forgetPassword(email: string) {
    const body = { email : email };
    return this.http.post(`${this.apiUrl}/api/auth/forget-password`, body, { observe: 'response' });
  }

  validateCode(email: string, code: number) {
    const body = { email : email, codigoDeVerificacao : code };
    return this.http.post(`${this.apiUrl}/api/auth/validate-reset-password`, body, { observe: 'response' });
  }

  resetPassword(email: string, password: string) {
    const body = { email : email, senha : password };
    return this.http.patch(`${this.apiUrl}/api/auth/reset-password`, body, { observe: 'response', responseType: 'text'});
  }

  deleteUser() {
    this.updateHeaders();
    return this.http.delete(`${this.apiUrl}/api/auth/${this.getUser().id}`, this.httpOptions);
  }

  updatePhoto(photo: string) {
    this.updateHeaders();
    let body = { idUsuario : this.getUser().id, foto : photo };
    return this.http.put(`${this.apiUrl}/api/auth/photo`, body, this.httpOptions)
  }

}
