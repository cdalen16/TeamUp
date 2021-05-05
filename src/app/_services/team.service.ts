
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {Team} from "../_models/team";




@Injectable({ providedIn: 'root' })
export class TeamService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Team[]>(`http://localhost:3030/team/allteams`);
  }

  getUser(name: string) {
    return this.http.get<User>(`http://localhost:3030/user/getuser${name}`);
  }

  delete(date: string){
    return this.http.delete(`http://localhost:3030/team/${date}`);
  }

  addTeam(team: Team, username: string) {
    return this.http.post(`http://localhost:3030/team/addteam`, {team, username});
  }

  editTeam(team: Team){
    return this.http.post(`http://localhost:3030/team/editteam`, team);
  }

  join(team: Team){
    return this.http.post(`http://localhost:3030/team/join`, team);
  }
  //
  // changeGoals(values) {
  //   console.log(values);
  //   return this.http.post(`http://localhost:3030/user/setgoals`, values);
  // }
  //
  // getGoals(username: string) {
  //   return this.http.get<number[]>(`http://localhost:3030/user/getgoals${username}`);
  // }
}
