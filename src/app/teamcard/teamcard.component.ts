import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../_models/user';
import {TeamService} from '../_services/team.service';
import {Team} from '../_models/team';
import {Router} from '@angular/router';
import {AuthService} from '../_services/auth.service';
import {first} from "rxjs/operators";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-teamcard',
  templateUrl: './teamcard.component.html',
  styleUrls: ['./teamcard.component.css']
})
export class TeamcardComponent implements OnInit {
  @Input() team: Team;
  @Output() deleteEvent = new EventEmitter();
  members: User[] = [];
  memStr: string;
  currUser: User;
  constructor(private hc: HomeComponent, private ts: TeamService, private route: Router, private as: AuthService) { }

  ngOnInit() {
    this.as.currentUser.subscribe(x => {this.currUser = x; } );
    this.updateMemStr();
  }
  delete(date) {
    this.deleteEvent.emit(date);
  }
  goToEdit() {
    // this.route.navigateByUrl('/edit', { state: {a: this.parecord}});
    this.route.navigate(['/edit', this.team.class, this.team.teamName, this.team.teamCap, this.team.description]);
  }
  join() {
    this.ts.join(this.team).pipe(first()).subscribe(
      d => {
        this.route.navigate(['/home']);
        this.hc.loadAllTeams();
        this.updateMemStr();
      }
    );
  }
  updateMemStr(){
    this.memStr = '';
    this.members = this.team.teamMembers;
    console.log(this.team.teamSize);
    for (let i = 0; i < this.team.teamSize; i++) {
      if ((i + 1) === this.members.length) {
        this.memStr = this.memStr + this.members[i].firstName + ' ' + this.members[i].lastName;
      } else {
        this.memStr = this.memStr + this.members[i].firstName + ' ' + this.members[i].lastName + ', ';
      }
    }

    console.log(this.memStr);
  }
}
