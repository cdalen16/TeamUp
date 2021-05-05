import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {UserService} from "../_services/user.service";
import {TeamService} from "../_services/team.service";
import {NotificationService} from "../_services/notification.service";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  teamForm: FormGroup;
  loading = false;
  submitted = false;
  roles = [];
  class = '';
  teamName = '';
  des = '';
  cap = 0;

  constructor(
    // private patternValidator: PatternValidator,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private teamService: TeamService,
    private notification: NotificationService
  ) {
  }

  ngOnInit() {
    this.class = this.route.snapshot.paramMap.get('class');
    this.teamName = this.route.snapshot.paramMap.get('name');
    this.cap = parseInt(this.route.snapshot.paramMap.get('cap'), 10);
    this.des = this.route.snapshot.paramMap.get('des');
    this.teamForm = this.formBuilder.group({
      class: [this.class, [Validators.required, Validators.pattern('^[a-zA-Z]+ [0-9]+$')]],
      teamName: [this.teamName, [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+$')]],
      description: [this.des, [Validators.required]],
      teamCap: [this.cap, [Validators.required, Validators.pattern('^[2-8]$'), Validators.min(2), Validators.max(7)]]
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
    this.teamService.editTeam(this.teamForm.value)
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
