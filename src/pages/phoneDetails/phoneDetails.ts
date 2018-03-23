import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-phone-details',
  templateUrl: 'phoneDetails.html',
})
export class PhoneDetailsPage {
  selectedPhone: any;
  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
    this.selectedPhone = navParams.get('phone');
    console.log(this.selectedPhone);
  }

  addToCart() {
    this.afAuth.authState.subscribe(data => {      
      let userRef = this.afDb.list<any>('/users/' + data.uid);
      userRef.update(
        'cart',
        { empty : false,
          contents: {}
        }
      );
    });
    this.toast.create({
      message: `You've added ${this.selectedPhone.model} to your cart.`,
      duration: 3000
    }).present();
  }

  ionViewDidLoad() {

  }

}
