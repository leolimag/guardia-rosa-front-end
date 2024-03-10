import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';



@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule 
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
