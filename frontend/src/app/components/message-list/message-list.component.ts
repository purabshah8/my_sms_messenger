import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PhonePipe } from '../../pipes/phone.pipe';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message-list',
  imports: [DatePipe, PhonePipe],
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})

// component to list all messages
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  maxChars = 250;
  subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService) { }

  // subscribe to messages observable on init
  ngOnInit(): void {
    this.subscription = this.messageService.messages$.subscribe(messages => {
      this.messages = messages;
    });
  }

  // unsubsrcibe on destroy
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCharCount(text: string): number {
    return text ? text.length : 0;
  }
}
