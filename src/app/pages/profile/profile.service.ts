// profile-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileImageSubject: BehaviorSubject<string | null>;
  public profileImage$: Observable<string | null>;

  constructor(private userService: UserService) {
    this.profileImageSubject = new BehaviorSubject<string | null>(null);
    this.profileImage$ = this.profileImageSubject.asObservable();
  }

  getProfileImage(): string | null {
    const user = this.userService.getUser();
    
    if (!user) {
      return null;
    }
    
    const photo = user.foto;

    if (photo == null || photo === '') {
      return null;
    } 

    return 'data:image/jpeg;base64,' + photo;
  }

  setUserImage(imageData: string): void {
    this.profileImageSubject.next(imageData);
  }

  getUserImage(): string | null {
    return this.profileImageSubject.value;
  }
}
