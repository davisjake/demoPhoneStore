import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PhoneDetailsPage } from '../phoneDetails/phoneDetails';
import { Phone } from '../../models/phone';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  phones : Observable<Phone[]>;
  //phoneListRef$: FirebaseListObservable<Phone[]>

  constructor(private afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.phones = this.afDb.list('phones').valueChanges();
    //this.phoneListRef$ = this.afDb.list('phones');
  }

  pushPhoneDetails(event, phone) { //push phoneDetialPage when phone clicked from list
    this.navCtrl.push(PhoneDetailsPage, {
      phone: phone
    });
  }
}
