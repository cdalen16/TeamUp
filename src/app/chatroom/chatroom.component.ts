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

  // nmessage = '';
  chatArray: Chat[];

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    this.chatService.getAll().subscribe(chats => this.chatArray = chats);
  }

  sendMessage(nmessage: string) {
    let nDate = new Date();
    let currUser;
    this.authService.currentUser.subscribe(user => currUser = user);
    const chat = {
      username: currUser.username,
      firstName: currUser.firstName,
      lastName: currUser.lastName,
      role: currUser.role,
      avatarcolor: currUser.avatarcolor,
      message: nmessage,
      date: nDate.toDateString() + ' at ' + nDate.getHours() + ':' + nDate.getMinutes()
    };

    this.chatService.sendChat(chat).subscribe(() => this.loadMessages());

  }

}
