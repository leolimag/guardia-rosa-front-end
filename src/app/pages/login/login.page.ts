import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { firstValueFrom } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email?: string;
  password?: string;
  error?: string;
  isCamufladoString!: string;
  isCamuflado: boolean = false;

  constructor(
      private router: Router,
      private authService: AuthService,
      private toastService: ToastService,
      private userService: UserService
     ) { }

  userRegister() {
    this.router.navigate(['/register']);
  }

  forgetPassword() {
    this.router.navigate(['/forget-password'])
  }

  ngOnInit() {
    this.isCamufladoString = this.userService.getModoCamuflado();
  
    if (this.isCamufladoString !== null) {
      this.isCamuflado = JSON.parse(this.isCamufladoString);
    } else {
      this.isCamuflado = false; 
    }
  }
  

  async login() {
    if (!this.email || !this.password) {
      this.error = 'Preencha todos os campos';
      return;
    }    
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        if (response.token != "") {
          this.userService.updateUser(response);
          this.router.navigate(['/home']);
          setTimeout(() => {
            location.reload();
          }, 50);
        }
      }, 
      error: (error) => {
        let mensagem = `STATUS --> ${error.status} - MENSAGEM --> ${error.message} - URL CHAMADA: ${error.url}`

        this.toastService.presentToast('bottom', mensagem, 2000);
      }
    })
      
  }
  
} 
