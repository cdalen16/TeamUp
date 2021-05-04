import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../_models/chat';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'chat-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() chatrecord: Chat;

  message = '';
  username = '';

  constructor() { }

  ngOnInit() {
    this.message = this.chatrecord.message;
    this.username = this.chatrecord.username;

  }

}
