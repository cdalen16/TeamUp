import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {ChatroomComponent} from './chatroom/chatroom.component';
import {AddteamComponent} from './addteam/addteam.component';
import {EditComponent} from './edit/edit.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [AuthGuard]}, {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
  { path: 'chat', component: ChatroomComponent }, { path: 'addteam', component: AddteamComponent},
  { path: 'edit/:class/:name/:cap/:des', component: EditComponent}, { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
