import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhoneDetailsPage } from './phoneDetails';

@NgModule({
  declarations: [
    PhoneDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhoneDetailsPage),
  ],
})
export class PhoneDetailsPageModule {}
