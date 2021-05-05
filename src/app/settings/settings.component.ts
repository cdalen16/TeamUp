import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {UserService} from '../_services/user.service';
import {User} from '../_models/user';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  newpass = '';
  verifypass = '';
  newbio = '';

  currUser: User;

  constructor(private userService: UserService, private authService: AuthService, private notif: NotificationService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => this.currUser = user);
  }

  changePass() {
    if (this.newpass === this.verifypass && this.newpass.length >= 6) {
      this.userService.changePass({password: this.newpass}).subscribe(() =>
        this.notif.showNotif('Your password has been changed', 'confirmation'));
    } else if (this.newpass.length < 6) {
      this.notif.showNotif('Password must be at least 6 characters long', 'error');
    } else {
      this.notif.showNotif('Passwords do not match', 'error');
    }
  }



  changeBio() {
    this.userService.changeBio({bio: this.newbio}).subscribe(() => this.currUser.bio = this.newbio);
  }

}
