import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { ModalComponent } from './modal/modal.component';
import { CardComponent } from './card/card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PostModalComponent } from './post-modal/post-modal.component';
import { HeaderModule } from '../shared/header/header.module';

@NgModule({
  declarations: [CustomButtonComponent, ModalComponent, CardComponent, PostModalComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    FormsModule,
    HeaderModule
  ],
  exports: [CustomButtonComponent, ModalComponent, CardComponent, PostModalComponent]
})
export class ComponentsModule { }
