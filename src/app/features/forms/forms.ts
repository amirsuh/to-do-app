import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Autocomplete } from "../autocomplete-searchbar/autocomplete/autocomplete";
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
    MatTab, Field, MatTableModule,
    Autocomplete
],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class Forms implements OnInit{
  displayedColumns: string[] = ['feature', 'templateDriven', 'reactive', 'signalBased'];

  dataSource = [
    { feature: 'Form Definition', templateDriven: 'HTML', reactive: 'TypeScript', signalBased: 'TypeScript' },
    { feature: 'Typing', templateDriven: '❌ Weak', reactive: '✅ Strong', signalBased: '✅ Strong' },
    { feature: 'Scalability', templateDriven: '❌ Low', reactive: '✅ High', signalBased: '⚠️ Medium' },
    { feature: 'Dynamic Forms', templateDriven: '❌ Hard', reactive: '✅ Easy', signalBased: '⚠️ Manual' },
    { feature: 'Testing', templateDriven: '❌ Hard', reactive: '✅ Easy', signalBased: '⚠️ Manual' },
    { feature: 'Performance', templateDriven: '⚠️ Average', reactive: '✅ Good', signalBased: '🚀 Excellent' },
    { feature: 'Learning Curve', templateDriven: '😊 Easy', reactive: '😐 Medium', signalBased: '😐 Medium–High' },
  ];

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


  // formArray
formarray = new FormGroup({
  skills: new FormArray([new FormControl('')])
})

former = new FormGroup({
  name: new FormControl<string>('', { nonNullable: true }),
  email: new FormControl<string>('', { nonNullable: true })
});
  constructor() {
    this.formsSample = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone:[''],
      contactMethod:[''],
      password: ['',[ Validators.required,Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/)]],
    });
    //  // Keep signals in sync with form changes
    //   this.loginForm().valueChanges.subscribe(val => {
    //     this.username.set(val.username);
    //     this.password.set(val.password);
    //   });
  }
  ngOnInit() {
    // this.formsSample.get('name')?.setValue('Amirsuhail');
    this.formsSample.setValue({name:'Amirsuhaj',phone:'',contactMethod:'', email:'ash@shd.com',password:'Pass1234'})
    console.log(this.formsSample.getRawValue())
    // this.formsSample.patchValue({password:'Passw@123'})
    // this.formsSample.get('name')?.reset();
    // this.formsSample.controls['email'].valueChanges.subscribe(val => console.log(val))
  //    this.formsSample.setValue({
  //   name: 'AngularDev',
  //   email: 'dev@example.com',
  //   password: 'Abcd1234'
  // });
  const phoneControl = this.formsSample.get('phone');
this.formsSample.get('contactMethod')?.valueChanges.subscribe(method => {
  if (method === 'phone') {
    phoneControl?.setValidators([Validators.required]);
  } else {
    phoneControl?.clearValidators();
  }
  phoneControl?.updateValueAndValidity();
});

  console.log(this.formsSample.valid);

  console.log(this.formsSample.valid);
    this.formsSample.statusChanges.subscribe(status => console.log(status));

  }
  // This method is called by the guard
  canDeactivate(): boolean {
    if (this.formsSample.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }


  submitSignalForm() {
  }


  get skills(): FormArray {
    return this.formarray.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(new FormControl(''));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    console.log(this.formarray.value);
  }

}
