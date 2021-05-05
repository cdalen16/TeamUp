import {Component, Input, OnInit} from '@angular/core';
import {User} from "../_models/user";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  @Input() member: User;
  @Input() memi: number;
  fullname = '';
  constructor() { }

  ngOnInit() {
    console.log('this member is ', this.member);
    this.fullname = this.member.firstName + ' ' + this.member.lastName;
  }

}
