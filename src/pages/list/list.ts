import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PhoneDetailsPage } from '../phoneDetails/phoneDetails';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  phones : Observable<any[]>;

  constructor(private afDb: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.phones = this.afDb.list('phones').valueChanges();
    this.phones.forEach((phone) => {
        console.log(phone);
    });
  }

  pushPhoneDetails(event, phone) { //push phoneDetialPage when phone clicked from list
    this.navCtrl.push(PhoneDetailsPage, {
      phone: phone
    });
  }
}
