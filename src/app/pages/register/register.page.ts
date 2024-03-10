import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/components/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;

  error?: string;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastController: ToastController,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  async showSuccessToast(mensagem: string) {
    const toast = await this.toastController.create ({
      message: mensagem,
      duration: 3000,
      position: 'top',
      color: 'success'
    })
    toast.present();
  }

  onSubmit() {

    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    
    if (!this.name || !/^[A-Za-z\s]+$/.test(this.name)) {
      this.error = 'Nome inválido! O nome deve conter apenas letras e espaços.';
      this.toastService.presentToast('bottom', this.error, 2000);
      return;
    }
    
    if (!this.email || !this.email.includes('@')) {
      this.error = 'Email inválido! Certifique-se de incluir o caractere "@".';
      this.toastService.presentToast('bottom', this.error, 2000);
      return;
    }

    if (!this.password || this.password !== this.confirmPassword) {
      this.error = 'As senhas não coincidem.';
      this.toastService.presentToast('bottom', this.error, 2000);
      return;
    }
    
    if (this.password.length < 5) {
      this.error = 'A senha deve ter no mínimo 5 caracteres.';
      this.toastService.presentToast('bottom', this.error, 2000);
      return;
    }
  
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      return;
    }
  
    if (this.password !== this.confirmPassword) {
      return;
    }
    
    this.registerService.registerUser(user).subscribe({
      next: () => {
        this.showSuccessToast('Usuário criado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        error = 'Algum erro ocorreu.';
        this.toastService.presentToast('bottom', error, 2000);
      },
    });
  
    this.router.navigate(['/login']);
  }

  back() {
    this.router.navigate(['/login']);
  }

}
