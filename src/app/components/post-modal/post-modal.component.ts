import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent  implements OnInit {
  @Input() postContent: any;

  likes : number = 0;
  likeBool : boolean = false;

  constructor(
    private modalController: ModalController,
  ){ }

  ngOnInit() {

  }

  closeModal() {
    this.modalController.dismiss();
  }

  like(){
    if(this.likeBool){
      this.likes--;
      this.likeBool = false;
    } else {
      this.likes++;
      this.likeBool = true;
    }
  }

}


