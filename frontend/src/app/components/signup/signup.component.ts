import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../../styles/auth.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup;
  error: string = '';
  private errorSubscription!: Subscription;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.errorSubscription = this.authService.authErrors$.subscribe(errors => {
      this.error = errors.join(',');
    });
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.isLoading = true;

    this.authService.signup(
      this.signupForm.value.username,
      this.signupForm.value.password
    ).subscribe({
      next: () => {
        this.isLoading = false;
        const user = JSON.parse(localStorage.getItem('user_data')!);
        this.router.navigate(['/messages', user.id]);
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }

}

