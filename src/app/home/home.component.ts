import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
// import {PARecord} from '../_models/PARecord';
// import {PArecordService} from '../_services/parecord.service';
import {AuthService} from '../_services/auth.service';
import {Team} from '../_models/team';
import {TeamService} from '../_services/team.service';
import {User} from "../_models/user";


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {

  currentUser: User;
  teams: Team[] = [];
  filterStr: string;


  constructor(
    // private parecordservice: PArecordService,
    private ts: TeamService,
    private authenticationService: AuthService,
    private notifService: NotificationService,
  ) {

  }

  ngOnInit() {
    this.loadAllTeams();
    this.currentUser = this.authenticationService.currentUserValue;

  }

  loadAllTeams() {
    console.log('load all teams');
    this.ts.getAll().subscribe(
      teams => {
        this.teams = teams;
      }

    );
  }


  deleteTeam(date) {
    this.ts.delete(date).pipe(first()).subscribe(() => {
      this.teams = null;
      this.loadAllTeams();
    });
  }

  // all, unfull, my teams
  show(num, currentUser) {
    if (num === 1) {
      this.loadAllTeams();
    } else if (num === 2) {
      this.ts.getAll().subscribe(team => {
        this.teams = team.filter(function(t) {
          return t.teamSize < t.teamCap;
        });
      }, error => this.notifService.showNotif(error, 'error w/ show(2)'));
    } else {
      this.ts.getAll().subscribe(team => {
        this.teams = team.filter(function(t) {
          let found = false;
          for(let i = 0; i < t.teamSize; i++){
            const thisUser = t.teamMembers[i];
            if (thisUser.username === currentUser.username){
              found = true;
            }
          }
          return found;
        });
      }, error => this.notifService.showNotif(error, 'error w/ show(3)'));
    }
  }

  filter(etv) {
    this.filterStr = etv;
    this.ts.getAll().subscribe(team => {
      this.teams = team.filter(function(t) {
        return t.teamName.includes(etv) || t.class.includes(etv);
      });
    }, error => this.notifService.showNotif(error, 'error w/ filter'));
  }
}

