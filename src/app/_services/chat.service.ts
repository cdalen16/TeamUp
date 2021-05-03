
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Chat} from '../_models/chat';




@Injectable({ providedIn: 'root' })
export class ChatService {


  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Chat[]>(`http://localhost:3030/chat/allchats`);
  }

  sendChat(chat: Chat) {
    return this.http.post(`http://localhost:3030/chat/sendchat`, chat);
  }
}
