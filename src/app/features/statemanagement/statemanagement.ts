import { Component, effect, inject, OnInit } from '@angular/core';
import { RxjsandobservablesService } from '../rxjsandobservables/service/rxjsandobservables';
import { MatCard, MatCardTitle, MatCardFooter } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { StateService } from './state-service';
import { Signalservice } from './signal/signalservice';

@Component({
  selector: 'app-statemanagement',
  imports: [MatCard, MatCardTitle, MatCardFooter, MatTableModule, CommonModule],
  templateUrl: './statemanagement.html',
  styleUrl: './statemanagement.scss',
})
export class Statemanagement implements OnInit {
  // using beh subject
  userService = inject(RxjsandobservablesService);
  stateService = inject(StateService);
  signalService = inject(Signalservice);
  user$ = this.stateService.user$;

  // using signals

  constructor() {
    effect(() => {
      // console.log('Todos changed:', this.signalService.fetchTodos());
    });
  }

  ngOnInit(): void {
    this.userService.getUserData().subscribe((users) => {
      console.log('User Data from Component 1:', users);
    });

    this.stateService.setUser({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    });
    this.signalService.fetchTodos();
  }
  addTodo(title: string) {
    this.signalService.addtodo(title);
  }

  toggleTodo(id: number) {
    this.signalService.toggleTodo(id);
  }

  setNewUser() {
    this.stateService.setUser({
      id: 2,
      name: 'Amirsuhail',
      email: 'amir@example.com',
    });
  }
}
