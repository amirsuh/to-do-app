import { Component, inject, OnInit } from '@angular/core';
import { RxjsandobservablesService } from '../rxjsandobservables/service/rxjsandobservables';
import { MatCard, MatCardTitle, MatCardFooter } from "@angular/material/card";
import { MatFormField } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { StateService } from './state-service';

@Component({
  selector: 'app-statemanagement',
  imports: [MatCard, MatFormField, MatCardTitle, MatCardFooter,MatTableModule,CommonModule],
  templateUrl: './statemanagement.html',
  styleUrl: './statemanagement.scss',
})
export class Statemanagement implements OnInit{
  // using beh subject
  userService = inject(RxjsandobservablesService)
  stateService = inject(StateService)
  user$ = this.stateService.user$;

// using signals



  ngOnInit(): void {
     this.userService.getUserData().subscribe(users => {
      console.log('User Data from Component 1:', users);
    });

     this.stateService.setUser({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
  }


  setNewUser(){
     this.stateService.setUser({
      id: 2,
      name: 'Amirsuhail',
      email: 'amir@example.com'
    });
  }
}
