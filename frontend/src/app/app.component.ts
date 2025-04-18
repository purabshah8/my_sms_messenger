import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageFormComponent } from './components/message-form/message-form.component'
import { MessageListComponent } from './components/message-list/message-list.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MessageFormComponent, MessageListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
