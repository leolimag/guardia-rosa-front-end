import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { ToastService } from 'src/app/components/toast/toast.service';
import { GuardianService } from 'src/app/pages/guardian/guardian.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor(
    private router: Router,
    private actionSheetCtrl: ActionSheetController,
    private guardianService: GuardianService,
    private userService: UserService,
    private toastService: ToastService,
    ) {

  }
  
  ngOnInit() {

  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goGuardian() {
    this.router.navigate(['/guardian']);
  }

  goLocation() {
    this.router.navigate(['/location']);
  }

  alertFavoriteGuardian() {
    const userId = this.userService.getUser().id;    
    this.guardianService.getFavoriteGuardianByUser(userId).subscribe({
      next: (response: any) => {
        this.presentActionSheetFavorite(response.telefone);
      },
      error: (error) => {
        this.toastService.presentToast('bottom', error.error, 2000);
      }
    })
  }

  callPolice(number: string) {
    const telUrl = 'tel:' + number;
    window.open(telUrl, '_system');
  }

  callFavoriteGuardian(number: string) {
    const telUrl = 'tel:' + number;
    window.open(telUrl, '_system');
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Deseja realmente ligar para a polícia?',
      buttons: [
        {
          text: 'Confirmar',
          icon: 'checkmark-outline',
          data: {
            action: 'action' ,
          },
          handler: () => {
            this.callPolice('190');
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close-outline',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async presentActionSheetFavorite(number: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Deseja realmente alertar seu guardião?',
      buttons: [
        {
          text: 'Confirmar',
          icon: 'checkmark-outline',
          data: {
            action: 'action' ,
          },
          handler: () => {
            this.callFavoriteGuardian(number);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close-outline',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

}
