import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, Page} from 'ionic-angular';
import { StudentInfo } from './studentinfo';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { StudentsListPage } from '../students-list/students-list';


@Component({
  templateUrl: 'build/pages/student-add-edit/student-add-edit.html',
})
export class StudentAddEditPage implements OnInit {
  opType = "";
  pagesegment = "basic";
  batchesList: FirebaseListObservable<any>;
  groupsList: FirebaseListObservable<any>;
  standardList: FirebaseListObservable<any>;
  classesList: FirebaseListObservable<any>;
  talentsList: FirebaseListObservable<any>;
  satsangActivitiesList: FirebaseListObservable<any>;
  MagazinesList: FirebaseListObservable<any>;
  exAPCList: FirebaseListObservable<any>;

  studentModel = new StudentInfo(0,null,'SV01-',0,0,0,null,null,null,null,'',
                  '','','',null,'', null,'',null,'','','','',null, null,'','',0,null,'','','',null,'','',null, '','','','','','','',null,'',null,'');
                  

  constructor(private nav: NavController, private navParams: NavParams, private af: AngularFire) {
    this.opType = this.navParams.get("opType");
  }

  ngOnInit(){
      this.batchesList = this.af.database.list('/Batches');
      this.groupsList = this.af.database.list('/Groups');
      this.standardList =  this.af.database.list('/Standards');
      this.classesList = this.af.database.list('/Sections');
      this.talentsList = this.af.database.list('/Talents');
      this.satsangActivitiesList = this.af.database.list('SatsangActivities');
      this.MagazinesList = this.af.database.list('/Magazines');
      this.exAPCList = this.af.database.list('/APC');
  }

  //Saves the student record to Firebase
  onSaveStudentInfo(model)
  {
    const studentItems = this.af.database.list('/Students');
    studentItems.push(this.studentModel);
    this.nav.setRoot(StudentsListPage);
        
  }

  
}
