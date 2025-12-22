import { Component, computed, inject, signal } from '@angular/core';
import {
  form,
  required,
  email as emailValidator,
  Field,
  email,
  minLength,
} from '@angular/forms/signals';
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
    MatTab,Field
  ],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class Forms {
  forms = { name: '', email: '', password: '' };
  // forms2={name:'',email:'',password:''}
  formsSample!: FormGroup;
  fb = inject(FormBuilder);

  // Signal
  loginModel = signal<LoginForm>({username:'',email:'',password:''})
  model = signal({username:'',email:'',password:''})

  loginForm = form(this.model,(login)=>{
    required(login.email,{message:'required'}),
    email(login.email,{message:'email'}),
    required(login.username,{message:'required'}),
    required(login.password,{message:'required'}),
    minLength(login.username, 8, { message: 'Must be at least 8 characters' });
  })

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

  submitSignalForm() {
    // if (this.formValid()) {
    //   console.log('Form submitted:', {
    //     username: this.username(),
    //     emails:this.emails(),
    //     password: this.passwords(),
    //   });
    // }
  }
}
