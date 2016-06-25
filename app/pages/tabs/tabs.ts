import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {StudentsListPage} from '../students-list/students-list';
import {MapPage} from '../map/map';
import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = StudentsListPage;
  tab3Root: any = MapPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
