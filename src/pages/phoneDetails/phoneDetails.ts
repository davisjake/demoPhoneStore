import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Phone } from '../../models/phone';

@IonicPage()
@Component({
  selector: 'page-phone-details',
  templateUrl: 'phoneDetails.html',
})
export class PhoneDetailsPage {
  selectedPhone = {} as Phone;
  userCartRef : AngularFireList<Phone>;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
    this.selectedPhone = navParams.get('phone');
    this.afAuth.authState.subscribe(data => {
      this.userCartRef = this.afDb.list<Phone>('/users/' + data.uid + '/cart');
    });
  }

  addToCart() {
    this.userCartRef.push( //update user cart reference with phone
      this.selectedPhone
    );
    this.toast.create({ //show message that phone has been added
      message: `You've added ${this.selectedPhone.model} to your cart.`,
      duration: 3000
    }).present();
  }
}
