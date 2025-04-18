import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MessengerComponent } from './components/messenger/messenger.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login Page',
    component: LoginComponent
  },
  {
    path: 'signup',
    title: 'Signup Page',
    component: SignupComponent
  },
  {
    path: 'messages/:userId',
    title: 'Messenger Page',
    component: MessengerComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
