import { Component, computed, inject, signal } from '@angular/core';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatFormField, MatInputModule, MatLabel } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
interface LoginForm {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-forms',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatCardContent,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatTabGroup,
    MatTab,
  ],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class Forms {
  forms = { name: '', email: '', password: '' };
  // forms2={name:'',email:'',password:''}
  formsSample!: FormGroup;
  fb = inject(FormBuilder);
  // formsGrp = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl('')
  // });
  // Signal-wrapped FormGroup
  // loginForm = signal<FormGroup>({
  //   username: this.fb.control('', { validators: [Validators.required] }),
  //   password: this.fb.control('', { validators: [Validators.required] })
  // });

  // // Signals for individual controls
  // username = signal(this.loginForm().get('username')!.value);
  // password = signal(this.loginForm().get('password')!.value);
  // Signals for each field
  username = signal('');
  emails= signal('')
  passwords = signal('');

  // Validation signals
  usernameValid = computed(() => this.username().trim().length > 0);
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailValid = computed(() => this.emailRegex.test(this.emails()));
  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  passwordValid = computed(() => this.passwordRegex.test(this.passwords()));


  // Overall form validity
  formValid = computed(() => this.usernameValid() && this.emailValid() && this.passwordValid());

  // Interaction state signals
  usernameTouched = signal(false);
  usernameDirty = signal(false);

  emailTouched = signal(false);
  emailDirty = signal(false);

  passwordTouched = signal(false);
  passwordDirty = signal(false);




  constructor() {
    this.formsSample = this.fb.group({
      name: ['', Validators.required, Validators.minLength(6)],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.pattern('/^(?=.*[a-z])(?=.*[A-Z])')],
    });
    //  // Keep signals in sync with form changes
    //   this.loginForm().valueChanges.subscribe(val => {
    //     this.username.set(val.username);
    //     this.password.set(val.password);
    //   });
  }

  submit() {
    if (this.formValid()) {
      console.log('Form submitted:', {
        username: this.username(),
        emails:this.emails(),
        password: this.passwords(),
      });
    }
  }
}
