import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { NotificationService } from '../_services/notification.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import {Role} from '../_models/role';
import {TeamService} from "../_services/team.service";

@Component({templateUrl: 'addteam.component.html',

  styleUrls: ['addteam.component.css']

})



export class AddteamComponent implements OnInit {
  teamForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];


  constructor(
    // private patternValidator: PatternValidator,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private teamService: TeamService,
    private notification: NotificationService
  ) {
  }

  ngOnInit() {
    this.teamForm = this.formBuilder.group({
      class: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+ [0-9]+$')]],
      teamName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+$')]],
      description: ['', [Validators.required]],
      teamCap: ['', [Validators.required, Validators.pattern('^[2-8]$'), Validators.min(2), Validators.max(7)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.teamForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.teamForm.invalid) {
      console.log('Error in onSubmit()');
      return;
    }

    this.loading = true;
    this.teamService.addTeam(this.teamForm.value, this.authService.currentUserValue.username)
      .pipe(first())
      .subscribe(
        data => {
          //  this.alertService.success('Registration successful', true);
          this.router.navigate(['/home']);
        },
        error => {
          console.log('Error:', error);
          this.notification.showNotif(error);
          this.loading = false;
        });
  }
}
