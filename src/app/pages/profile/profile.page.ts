import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/auth.service';
import { AlertController } from '@ionic/angular';
import { CameraResultType } from '@capacitor/camera';
import { Camera } from '@capacitor/camera';
import { ProfileService } from './profile.service';
import { ToastService } from 'src/app/components/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any;
  profileImage: string | undefined;
  foto: any;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private alertController: AlertController,
    private profileService: ProfileService,
    private toastService: ToastService
  ){
  }

  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      if(this.user.foto){
        this.foto = 'data:image/jpeg;base64,' + this.user.foto;
        this.profileService.setUserImage(this.foto);
        this.profileImage = this.foto;
      }

    });

  }

  async takePhoto() {
    let image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });

    let imageData = 'data:image/jpeg;base64,' + image.base64String;
    let base64: any = image.base64String;
    
    this.userService.updatePhoto(base64).subscribe({
      next: () => {        
        this.profileImage = imageData;        
        this.profileService.setUserImage(imageData);

        let user = this.userService.getUser();
        user.foto = base64;
        localStorage.setItem("user", JSON.stringify(user));
      }, 
      error: (error) => {
        this.toastService.presentToast("bottom", error.error, 2000);
      }
    })
  }

  async openRemoveUserDialog() {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: `Você deseja mesmo excluir sua conta? Lembre-se que esta ação é irreversível.`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteAccount() {
    this.userService.deleteUser().subscribe({
      next: () => {
        this.auth.deleteAccount();
      },
      error: (error) => {
        console.error(error);
      }
    }
    );
  }


}
