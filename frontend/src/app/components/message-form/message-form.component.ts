import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-form',
  imports: [ReactiveFormsModule],
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss'],
})

// form component to create and submit a message
export class MessageFormComponent {
  @Input({ required: true }) userId!: string;
  messageForm: FormGroup;
  charCount = 0;
  maxChars = 250;

  // construct & inject form builder & message service
  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.messageForm = this.fb.group({
      to: ['', [
        Validators.required,
        Validators.pattern(/^(\+?\d{1,3})?\d{10}$|^\d{3}-\d{3}-\d{4}$/)
      ]],
      body: ['', [Validators.required, Validators.maxLength(this.maxChars)]]
    });

    // Update character count on value change
    this.messageForm.get('body')?.valueChanges.subscribe(value => {
      this.charCount = value ? value.length : 0;
    });
  }

  // normalize phone number to +, country code and digits
  normalizePhoneNumber(phone: string): string {
    if (!phone) return '';

    let digits = phone.replace(/\D/g, '');

    // default country code of 1 for US
    if (digits.length === 10) {
      digits = `1${digits}`;
    }
    return `+${digits}`;
  }

  // create message on form submission
  onSubmit(): void {
    if (this.messageForm.invalid) { return; }

    const message: Message = {
      to: this.normalizePhoneNumber(this.messageForm.value.to),
      body: this.messageForm.value.body
    };

    console.log(message);

    this.messageService.createMessage(message).subscribe({
      next: () => { this.resetForm(); },
      error: (error) => { console.error('Error sending message:', error); }
    });
  }

  // reset fields and char count
  resetForm(): void {
    this.messageForm.reset();
    this.charCount = 0;
  }
}
