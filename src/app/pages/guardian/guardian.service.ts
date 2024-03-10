import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user/user.service';
import { HttpHeaders } from '@angular/common/http';
import { tap, Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardianService {
  //private apiUrl = ' http://localhost:8082';
  private apiUrl = 'https://abraco-rosa-17121aee456e.herokuapp.com';
  private user = this.userService.getUser();
  
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`
    })
  };

  guardianAdded = new EventEmitter<void>();

  constructor(private http: HttpClient, private userService: UserService) {}

  alertGuardian(phoneNumber: string) {
    if (phoneNumber) {
      const telUrl = 'tel:' + phoneNumber;
      window.open(telUrl, '_system');
    } else {
      console.error('Número de telefone inválido.');
    }
  }

  getGuardians() : Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/guardian/${this.user.id}`, this.httpOptions);
  }

  addGuardian(nome: string, telefone: number, usuarioId: number) {
    const body = { nome, telefone, usuarioId };
    return this.http.post(`${this.apiUrl}/api/guardian`, body, this.httpOptions)
      .pipe(
        tap(() => {
          this.guardianAdded.emit();
        })
      );
  }

  updateGuardian(guardian: any) {
    const body = { id : guardian.id, nome : guardian.nome, telefone : guardian.telefone };
    return this.http.put(`${this.apiUrl}/api/guardian`, body, this.httpOptions);
  }

  deleteGuardian(id: number) {
    return this.http.delete(`${this.apiUrl}/api/guardian/${id}`, this.httpOptions);
  }

  favoriteGuardian(id: number) {
    const body = { id : id, usuarioId : this.user.id };
    return this.http.patch(`${this.apiUrl}/api/guardian/favorite`, body, this.httpOptions); 
  }

  getGuardianById(id: number) {
    return this.http.get(`${this.apiUrl}/api/guardian/to-edit/${id}`, this.httpOptions);
  }

  getFavoriteGuardianByUser(id: number) {
    return this.http.get(`${this.apiUrl}/api/guardian/favorite/${id}`, this.httpOptions);
  }

}
