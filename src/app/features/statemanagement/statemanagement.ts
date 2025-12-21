import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { RxjsandobservablesService } from '../rxjsandobservables/service/rxjsandobservables';
import { MatCard, MatCardTitle, MatCardFooter } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { StateService } from './state-service';
import { Signalservice } from './signal/signalservice';
import { Store } from '@ngrx/store';
import * as TodoActions from '../../state/todo-ngrx/todo.action';
import * as TodoSelectors from '../../state/todo-ngrx/todo.selector';
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
  // store = inject(Store);
  user$ = this.stateService.user$;
  // todos$ = this.store.select(TodoSelectors.selectAllTodos);
  // loading$ = this.store.select(TodoSelectors.selectLoading);
  // error$ = this.store.select(TodoSelectors.selectError);

  celsius = signal(0);
  fahrenheit = computed(()=> (this.celsius()*9/5)+32)

  // using signals

  constructor() {
    effect(() => {
      console.log('celsius', this.celsius())
      // console.log('Todos changed:', this.signalService.fetchTodos());
    });
  }

  increase(){
    this.celsius.update(v=>v+1)
  }
  decrese(){
  this.celsius.update(v=>v-1)
  }

  reset(){
    this.celsius.set(0)
  }

  updateTemp(event:Event){
    const input = event.target as HTMLInputElement
    this.celsius.set(Number(input.value))
  }

  ngOnInit(): void {
    // this.store.dispatch(TodoActions.loadTodos());
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

  toggleTodeo(id: number) {
    // Implement toggle action
  }
}
