import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/components/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-validate-reset-password',
  templateUrl: './validate-reset-password.page.html',
  styleUrls: ['./validate-reset-password.page.scss'],
})
export class ValidateResetPasswordPage implements OnInit {

  email: any;
  code!: number;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private toastService: ToastService) { }
  
  onSubmit() {
    this.userService.validateCode(this.email, this.code).subscribe({
      next: () => {
        this.router.navigate(['/reset-password', this.email]);
      },
      error: (error) => {
        this.toastService.presentToast('bottom', error.error, 2000);
      }
    })
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.email = String(params.get('email'));
    })
  }

  sendCodeAgain() {
    this.userService.forgetPassword(this.email).subscribe({
      next: () => {
        this.toastService.presentToast('bottom', "Enviamos um novo código, confira sua caixa de e-mail", 5000);
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
