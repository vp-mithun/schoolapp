import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';
import {FirebaseAuth, FirebaseRef, AuthProviders, AuthMethods, AngularFire } from 'angularfire2';


@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(private nav: NavController, private userData: UserData, public auth: FirebaseAuth, public af: AngularFire) {
    this.login.username = 'mithun4baps@gmail.com';
    this.login.password = 'baps@123';
  }

  onLogin(form) {
    this.submitted = true;
//{ email: 'email', password: 'pass' }
    if (form.valid) {
      // this.userData.login(this.login.username);
      // this.nav.push(TabsPage);

      // login usig the email/password auth provider
        this.af.auth.login({ email: this.login.username, password: this.login.password }, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((authData) => {
          this.nav.push(TabsPage);        
        }).catch((error) => {            
            console.log(error)
        });        
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
