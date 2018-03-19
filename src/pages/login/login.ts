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

  async login(user: User) { //Uses promise so set as async, can load when done at server side
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
      .then( loggedUser => {
        if(loggedUser.emailVerified) {
          //push to next page
          console.log("You may enter");
          this.navCtrl.setRoot(ListPage);
        }
        else {
          alert("Email is not yet verified, please verify your email address and then log in.");
        }
      });
  }

  register() { //push register page to user
    this.navCtrl.push('RegisterPage');
  }

}
