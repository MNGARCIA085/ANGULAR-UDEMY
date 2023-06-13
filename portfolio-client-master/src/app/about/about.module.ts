import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { MeComponent } from './me/me.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
