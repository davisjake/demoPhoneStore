import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Phone } from '../../models/phone';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shoppingCart.html',
})
export class ShoppingCartPage {
  cartRef : Observable<Phone[]>;
  cartSize : Number;
  totalCost : Number;

  constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.totalCost = 0; //set total cost and cart size to 0 as default
    this.cartSize = 0;
    this.afAuth.authState.subscribe(data => { //grab user data
      this.cartRef = this.afDb.list<Phone>('/users/' + data.uid + '/cart').valueChanges(); //grab cart data associated with uid
      this.cartRef.subscribe(phonesInCartRef => {//map phone reference to actual data
        this.cartSize = phonesInCartRef.length; //set amount of items in cart
        phonesInCartRef.forEach(function(phone) { //set cost of all items by looping through cart
          this.totalCost += phone.price;
        }, this);
        this.totalCost = Number(this.totalCost.toFixed(2));
      });
    });

  }

}
