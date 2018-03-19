import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth'; //should abstract to service for production app

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User) {
    try { //await for response
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
        newUser => {
          console.log(newUser); //grab user info. for testing, make sure works
          if(newUser) { //If User created
            newUser.sendEmailVerification().then(function() { //send verification email
              console.log("Verification Email Sent");
            }).catch(function(e) {
              console.log(e);
            });
          }
        }
      )
      this.navCtrl.setRoot(LoginPage); //Go to Login Page
    }
    catch(e) {
      console.log(e);
      if(e.code === 'auth/argument-error') {
        alert('Input is Invalid');
      }
      else {
        alert(e); //make into function that changes html
      }
    }
  }
}