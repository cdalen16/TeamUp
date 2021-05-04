import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {ChatService} from '../_services/chat.service';
import {Chat} from '../_models/chat';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  nmessage: string;
  chatArray: Chat[];

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getAll().subscribe(chats => this.chatArray = chats);
  }

  sendMessage() {
    let currUser;
    this.authService.currentUser.subscribe(user => currUser = user);
    const chat = {
      username: currUser.username,
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      role: currUser.role,
      message: this.nmessage
    };

    this.chatService.sendChat(chat).subscribe(() =>
    this.loadMessages());

  }

}
