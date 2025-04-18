import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})

// service to create & retreive messages
export class MessageService {
  private apiUrl = 'api/messages';
  // BehaviorSubject to store and emit the current list of messages
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  // Expose the observable part of the BehaviorSubject
  public messages$ = this.messagesSubject.asObservable();


  constructor(private http: HttpClient) {
    this.getMessages()
  }

  // get messages from backend & set them as messages subject
  getMessages(): void {
    this.http.get<Message[]>(this.apiUrl).subscribe({
      next: (messages) => {  this.messagesSubject.next(messages); },
      error: (error) => { console.error('Error loading messages', error); }
    });
  }

  // post request to create a message, then add newly created message to messages subject
  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message)
      .pipe(
        tap((newMessage) => {
          const currentMessages = this.messagesSubject.value;
          // Add the new message to the array
          this.messagesSubject.next([newMessage, ...currentMessages]);
        })
      );
  }
}
