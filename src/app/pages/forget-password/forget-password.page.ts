import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/components/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  email: string = "";

  constructor(private router: Router, private userService: UserService, private toastService: ToastService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.forgetPassword(this.email).subscribe({
      next: () => {
        this.router.navigate(['/validate-reset-password', this.email]);
      },
      error: (error) => {
        this.toastService.presentToast('bottom', error.error, 2000);
      }
    }
    )
  }

  back() {
    this.router.navigate(['/login']);
  }

}
