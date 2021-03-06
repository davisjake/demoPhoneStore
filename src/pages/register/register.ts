import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'; //should abstract to service for production app

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(private afDb: AngularFireDatabase, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try { //await for response
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(
        newUser => {
          console.log(newUser); //grab user info. for testing, make sure works
          if(newUser) { //If User created
            this.afDb.list<any>('/users').update(  //create user reference in db with empty cart reference
              newUser.uid,
              { email : user.email }
            );
            newUser.sendEmailVerification().then(function() { //Send verification email
              console.log("Verification Email Sent");
            }).catch(function(e) {
              console.log(e);
            });
          }
        }
      )
      this.navCtrl.setRoot(LoginPage); //Navigate to Login Page
    }
    catch(e) {
      console.log(e);
      if(e.code === 'auth/argument-error') {
        alert('Input is Invalid');
      }
      else {
        alert(e);
      }
    }
  }
}
