import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PhoneDetailsPage } from '../phoneDetails/phoneDetails';
import { Phone } from '../../models/phone';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  phoneListRef : Observable<Phone[]>;

  constructor(private afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.phoneListRef = this.afDb.list<Phone>('phones').valueChanges();
  }

  pushPhoneDetails(event, phone) { //push phoneDetialPage when phone clicked from list
    this.navCtrl.push(PhoneDetailsPage, {
      phone: phone
    });
  }
}
