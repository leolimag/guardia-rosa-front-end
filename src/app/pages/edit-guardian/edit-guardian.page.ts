import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardianService } from '../guardian/guardian.service';
import { ToastService } from 'src/app/components/toast/toast.service';

@Component({
  selector: 'app-edit-guardian',
  templateUrl: './edit-guardian.page.html',
  styleUrls: ['./edit-guardian.page.scss'],
})
export class EditGuardianPage implements OnInit {

  id: any;
  guardian: any;
  
  constructor(private activatedRoute: ActivatedRoute, private guardianService: GuardianService, private router: Router, private toastService: ToastService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.getGuardianById();
    })
  }

  getGuardianById() {
    return this.guardianService.getGuardianById(this.id).subscribe({
      next: (guardian) => { this.guardian = guardian },
      error: (error) => {
        console.error('Erro ao consultar guardião:', error);
      } 
    })
  }

  editGuardian() {
    if (!this.guardian.nome || !this.guardian.telefone) {
      this.toastService.presentToast('bottom', 'Campos nome e telefone são obrigatórios!', 2000);
      return;
    } else if (String(this.guardian.phone).length < 9) {
      console.log(String(this.guardian.phone).length);
      
      this.toastService.presentToast('bottom', 'O seu telefone deve ter 9 digitos, além do seu DDD.', 2000);
      return;
    } else {      
      return this.guardianService.updateGuardian(this.guardian).subscribe({
        next: () => {
          this.guardianService.guardianAdded.emit();
          this.router.navigate(['/guardian']);
        },
        error: (error) => {
          console.error('Erro ao atualizar guardião:', error);
        }
      });
    }
  }

  backToGuardian() {
    this.router.navigate(['/guardian']);
  }

}
