import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Phone } from '../../models/phone';

/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shoppingCart.html',
})
export class ShoppingCartPage {
  cartRef : Observable<Phone[]>;
  cartSize: number;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.afAuth.authState.subscribe(data => { //grab user data
      this.cartRef = this.afDb.list('/users/' + data.uid + '/cart').valueChanges(); //grab cart data associated with uid
      this.cartRef.subscribe(phonesInCartRef => {//map phone reference to actual data
        console.log(phonesInCartRef)
      });
    });
  }

}
