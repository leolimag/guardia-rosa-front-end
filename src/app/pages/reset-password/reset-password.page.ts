import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ToastService } from 'src/app/components/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  password?: string;
  confirmPassword?: string;
  error?: string;
  email!: string;

  constructor(private userService: UserService, private router: Router, private toastService: ToastService, private toastController: ToastController, private activatedRoute: ActivatedRoute) { }

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
    if (this.password !== this.confirmPassword) {
      this.error = 'As senhas não coincidem.';
      this.toastService.presentToast('bottom', this.error, 2000);
      return;
    }

    if (!this.password || !this.confirmPassword) {
      this.error = 'Preencha todos os campos.';
      this.toastService.presentToast('bottom', this.error, 2000);
      return;
    }

    if (this.password.length < 5) {
      this.error = 'A senha deve ter no mínimo 5 caracteres.';
      this.toastService.presentToast('bottom', this.error, 2000);
      return;
    }

    this.userService.resetPassword(this.email, this.password).subscribe({
      next: (response) => {
        this.toastService.presentToast('bottom', String(response.body), 2000);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastService.presentToast('bottom', error.error, 2000);
      }
    })

  }

  back() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.email = String(params.get('email'));
    })
  }

}
