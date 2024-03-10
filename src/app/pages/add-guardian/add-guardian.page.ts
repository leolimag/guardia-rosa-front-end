import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from '../guardian/guardian.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-guardian',
  templateUrl: './add-guardian.page.html',
  styleUrls: ['./add-guardian.page.scss'],
})
export class AddGuardianPage implements OnInit {
  userData: any;
  name: string = "";
  phone: any;

  constructor(
    private router: Router,
    private guardianService : GuardianService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private userService: UserService,
    private alertController: AlertController
  ) { 

    this.userData = this.userService.getUser();
  }

  ngOnInit() {  
    this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.name = params['name'];
        this.phone = params['phone'];
      }
    });
  }
  
  addGuardian() {
    if (!this.name || !this.phone) {
      this.toastService.presentToast('bottom', 'Campos nome e telefone são obrigatórios!', 2000);
      return;
    } else if (String(this.phone).length < 11){
      this.toastService.presentToast('bottom', 'O seu telefone deve ter 9 digitos, além do seu DDD.', 2000);
      return;
    } else {
      this.guardianService.addGuardian(this.name, this.phone, this.userData.id ).subscribe({
        next: (response) => {
          this.name = '';
          this.phone = '';
          this.guardianService.guardianAdded.emit();
        },
        error: () => {
          this.presentAlert();
        }
      });
    }
    this.router.navigate(['/guardian']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Limite atingido',
      message: 'Você pode adicionar somente até 10 guardiões!',
      buttons: ['Entendi'],
    });
    
    await alert.present();
  }
  
  backToGuardian() {
    this.router.navigate(['/guardian']);
  }

}
