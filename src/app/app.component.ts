import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ProfileService } from './pages/profile/profile.service';
import { UserService } from './services/user/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  profileImage: any;
  private profileImageSubscription: Subscription;
  public isCamufladoActive = false;

  public camuflado = { title: 'Modo camuflado', icon: 'eye-off' };

  public appPages = [
    { title: 'Meu perfil', url: 'profile', icon: 'person' },
    { title: 'Sobre', url: 'about', icon: 'information-circle' },
  ];

  constructor(
    public auth: AuthService,
    private profileService: ProfileService,
    private userService: UserService
    ) {
      this.profileImageSubscription = this.profileService.profileImage$.subscribe(
        (imageData) => {
          this.profileImage = imageData;
        }
      );
    }

  ngOnInit() {
    this.isCamufladoActive = Boolean(this.userService.getModoCamuflado());
    this.getUserImage();
  }

  toggleChanged(event: any) {
    this.isCamufladoActive = event.detail.checked;

    if (this.isCamufladoActive) {
      this.userService.activeModoCamuflado();
      this.auth.redirectToLogin();
    } else {      
      this.userService.desactiveModoCamuflado();      
    }
  }

  getUserImage() {
    this.profileImage = this.profileService.getProfileImage();
  }

  logout() {
    this.auth.redirectToLogin();
    this.clearInputFields();
  }

  clearInputFields() {
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(input => {
      input.value = '';
    });
  }

}
