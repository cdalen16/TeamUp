
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }

  getUser(name: string) {
    return this.http.get<User>(`http://localhost:3030/user/getuser${name}`);
  }

  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
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
