import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
// import {PARecord} from '../_models/PARecord';
// import {PArecordService} from '../_services/parecord.service';
import {AuthService} from '../_services/auth.service';


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  currentUser = this.authenticationService.currentUserValue;

  // parecords: PARecord[] = [];


  constructor(
    // private parecordservice: PArecordService,
    private authenticationService: AuthService,
    private notifService: NotificationService,
  ) {}

  ngOnInit() {

    // this.loadAllPArecords();
  }

  // private loadAllPArecords() {
  //   console.log('loadAllParecords()');
  //   this.parecordservice.getAll().subscribe(
  //        parecords => {
  //          this.parecords = parecords.filter(x => x.createdBy.username === this.currentUser.username);
  //          // this.parecords = parecords;
  //        },
  //       error => {
  //           this.notifService.showNotif(error.toString(), 'warning'); });
  // }
  //
  // // createPARecord() {
  // //   this.parecordservice.add().pipe(first()).subscribe(
  // //     resp => {
  // //       this.notifService.showNotif('Recorded!', 'response');
  // //       this.parecords = null;
  // //       this.loadAllPArecords();
  // //       }, error => {
  // //       this.notifService.showNotif(error); });
  // // }
  //
  // deletePARecord(date) {
  //   // this.userService.deleteActivity(date);
  //   this.parecordservice.delete(date).pipe(first()).subscribe( () => {
  //       this.parecords = null;
  //       this.loadAllPArecords();
  //   });
  // }
  // editPARecord(date) {
  //   // this.userService.deleteActivity(date);
  //   window.location.href = '/edit';
  //   }

}

