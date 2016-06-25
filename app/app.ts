import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Events, Platform, Nav, MenuController} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';
import {ConferenceData} from './providers/conference-data';
import {UserData} from './providers/user-data';
import {AccountPage} from './pages/account/account';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import { AngularFire, FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html',
  providers:[
    FIREBASE_PROVIDERS,
    // Initialize Firebase app  
    defaultFirebase({
    apiKey: "AIzaSyDvF9nLDkHigQS_LPu3UjGWtyQM28_STnU",
	  authDomain: "project-7958784671612383761.firebaseapp.com",
    databaseURL: "https://project-7958784671612383761.firebaseio.com",
    storageBucket: "project-7958784671612383761.appspot.com",
  })
  ]
})
class SchoolApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageObj[] = [
    { title: 'Home', component: TabsPage, icon: 'home' },
    { title: 'Students', component: TabsPage, index: 1, icon: 'contacts' },
    { title: 'Fees', component: TabsPage, index: 2, icon: 'cash' },
    { title: 'Exams', component: TabsPage, index: 3, icon: 'clipboard' },
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Logout', component: TabsPage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    // { title: 'Signup', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any = LoginPage;

  constructor(
    private events: Events,
    private userData: UserData,
    private menu: MenuController,
    platform: Platform,
    confData: ConferenceData
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    // load the conference data
    confData.load();

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
  }

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});

    } else {
      this.nav.setRoot(page.component);
    }

    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}


// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/

ionicBootstrap(SchoolApp, [ConferenceData, UserData], {
  tabbarPlacement: 'bottom'
});
