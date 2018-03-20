import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) { //Uses promise so set as async
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then( loggedUser => {
          if(loggedUser.emailVerified) { //push to Phone List page
            console.log("You may enter");
            this.navCtrl.setRoot(ListPage);
          }
          else {
            alert("Email is not yet verified, please verify your email address and then log in.");
          }
        });
    }
    catch(error) {
      if (error.code === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(error.message);
      }
      console.log(error);
    }
  }

  register() { //push register page to user
    this.navCtrl.push('RegisterPage');
  }

}
