import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    HttpClientModule,
    ComponentsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    HeaderModule,
    FooterModule,
    ComponentsModule
  ]
})
export class SharedModule { }
