import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageFormComponent } from '../message-form/message-form.component'
import { MessageListComponent } from '../message-list/message-list.component'

@Component({
  selector: 'app-messenger',
  imports: [MessageFormComponent, MessageListComponent],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.scss'
})
export class MessengerComponent implements OnInit {
  userId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => { this.router.navigate(['/login']); },
      error: (error) => { console.log(error); }
    });
  }
}
