import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/pages/profile/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  profileImage!: string | null;

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.profileImage = this.profileService.getProfileImage();
  }

  isHomePage(): boolean {
    return this.router.url === '/home';
  }

  myPosts() {
    this.router.navigate(['/my-posts'])
  }

}
