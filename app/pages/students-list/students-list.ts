import { Component, OnInit } from '@angular/core';
import {NavController, Page, ActionSheet} from 'ionic-angular';
import {ConferenceData} from '../../providers/conference-data';
import {SpeakerDetailPage} from '../speaker-detail/speaker-detail';
import {SessionDetailPage} from '../session-detail/session-detail';
import { StudentAddEditPage } from '../student-add-edit/student-add-edit';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  templateUrl: 'build/pages/students-list/students-list.html'
})
export class StudentsListPage implements OnInit {
  actionSheet: ActionSheet;
  speakers = [];
  studentsList: FirebaseListObservable<any>;

  constructor(private nav: NavController, confData: ConferenceData, private af: AngularFire) {
    confData.getSpeakers().then(speakers => {
      this.speakers = speakers;
    });
  }

  ngOnInit(){
      this.studentsList = this.af.database.list('/Students');
  }

  goToSessionDetail(session) {
    this.nav.push(SessionDetailPage, session);
  }

  goToAddStudentDetail()
  {
    this.nav.push(StudentAddEditPage, {opType:"Add"})
  }

  goToSpeakerDetail(speakerName: string) {
    this.nav.push(SpeakerDetailPage, speakerName);
  }

  goToSpeakerTwitter(speaker) {
    window.open(`https://twitter.com/${speaker.twitter}`);
  }

  openSpeakerShare(speaker) {
    let actionSheet = ActionSheet.create({
      title: 'Share ' + speaker.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
            if (window['cordova'] && window['cordova'].plugins.clipboard) {
              window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
            }
          }
        },
        {
          text: 'Share via ...',
          handler: () => {
            console.log('Share via clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
}
