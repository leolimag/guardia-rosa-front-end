import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  postContent: string = '';

  constructor(private modalController: ModalController, private toastService: ToastService) {}

  fecharModal() {
    this.modalController.dismiss();
  }

  savePost() {
    if (this.postContent) {
      this.modalController.dismiss(this.postContent);
    } else {
      this.toastService.presentToast('bottom', 'Sua mensagem não pode ser vazia!', 2000);
    }
  }

}
