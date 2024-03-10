import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from './guardian.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-guardian',
  templateUrl: './guardian.page.html',
  styleUrls: ['./guardian.page.scss'],
})
export class GuardianPage implements OnInit {

  id: any;
  name: string = '';
  phone: number = 0;
  guardians: any[] = [];
  idToDelete: number | null = null;
  phoneNumber = '';
  url: string = "https://wa.me/";

  private guardianAddedSubscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private guardianService : GuardianService,
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private cdr: ChangeDetectorRef
  ) {
    this.guardianService.guardianAdded.subscribe(() => {
      this.setGuardians(); 
    });
  }

  alertGuardian(phoneNumber: string) {
    this.guardianService.alertGuardian(phoneNumber);
  }

  async confirmAlert(phoneNumber: string) {
    this.url = "https://wa.me/";

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Alertar guardião?',
      buttons: [
        {
          text: 'Telefone',
          icon: 'call-outline',
          data: {
            action: 'action' ,
          },
          handler: () => {
            this.alertGuardian(phoneNumber);
          },
        },
        {
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          data: {
            action: 'action' ,
          },
          handler: async () => {
            let latitude = localStorage.getItem("latitude");
            let longitude = localStorage.getItem("longitude");
        
            if (latitude == null || longitude == null) {
              const coordinates = await Geolocation.getCurrentPosition();
              localStorage.setItem("latitude", coordinates.coords.latitude.toString())
              localStorage.setItem("longitude", coordinates.coords.longitude.toString())
        
              latitude = coordinates.coords.latitude.toString();
              longitude = coordinates.coords.longitude.toString();
            }

            const helpMessage = `Me ajude! Estou em perigo! Minha localização: https://www.google.com/maps/search/?api=1%26query=${latitude}%2B${longitude}`;

            phoneNumber = "+55" + phoneNumber;
            this.url = this.url + phoneNumber + '?text=' + helpMessage; 
            
            window.open(this.url, '_blank');
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

  async presentActionSheet(id: number, name: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que você deseja fazer com esse guardião?',
      buttons: [
        {
          text: 'Remover',
          role: 'destructive',
          icon: 'person-remove-outline',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.openRemoveGuardianDialog(id, name);
          },
        },
        {
          text: 'Favoritar',
          icon: 'star-outline',
          data: {
            action: 'favorite',
          },
          handler: () => {
            this.favoriteGuardian(id);
          },
        },
        {
          text: 'Editar',
          icon: 'create-outline',
          data: {
            action: 'edit' ,
          },
          handler: () => {
            this.goEditGuardian(id);
          },
        },
        {
          text: 'Cancel',
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

  async openRemoveGuardianDialog(id: number, name: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Deseja remover o guardião ${name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Remover',
          handler: () => {
            this.deleteGuardian(id);
          }
        }
      ]
    });

    await alert.present();
  }

  favoriteGuardian(id: number) {
    if (id != null) {
      this.guardianService.favoriteGuardian(id).subscribe({
        next: () => {
          this.setGuardians();
          this.router.navigate(['/guardian']);
        }, 
        error: (error) => {
          console.error('Erro ao favoritar guardião:', error);
        },
      })
    }
  }

  deleteGuardian(id: number) {
    if (id !== null) { 
      this.guardianService.deleteGuardian(id).subscribe({
        next: () => {
          this.setGuardians();
          this.router.navigate(['/guardian']);
        },
        error: (error) => {
          console.error('Erro ao excluir guardião:', error);
        },
      });
    }
  }

  ngOnDestroy() {
    this.guardianAddedSubscription.unsubscribe();
  }

  ngOnInit() {
    this.setGuardians(); 
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.phone = params['phone'];
    });
    this.guardianAddedSubscription = this.guardianService.guardianAdded.subscribe(() => {
      this.setGuardians();
    });
  }

  setGuardians() {
    this.guardianService.getGuardians().subscribe({
      next: (guardians: any) => {
        this.guardians = guardians;
        this.guardians.sort((a, b) => (a.favorito === b.favorito) ? 0 : a.favorito ? -1 : 1);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao obter guardiões:', error);
      }
    });
  }

  goAddGuardian() {
    console.log();
    this.router.navigate(['/add-guardian']);
  }

  goEditGuardian(id: number) {
    this.router.navigate(['/edit-guardian', id])
  }

}
