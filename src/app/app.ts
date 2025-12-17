import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Helloworld } from "./component/helloworld/helloworld";
import { Child } from "./component/child/child";
import { Counter } from "./component/counter/counter";
import {Highlight} from './directive/highlight.directive'
import { ApiBind } from "./component/api-bind/api-bind";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, RouterLink, Helloworld, Child, Counter, Highlight, ApiBind],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('todo-app');
    // parentMessage:string = signal('this is child msg')
  parentMessage: string='jdg bg'
  sharedCount:number=0
  //WritableSignal<string> = signal('fgcr');
  newTodo = '';
  todos = signal<string[]>([]);


  addTodo(){
   if(this.newTodo.trim()){
    this.todos.update(list=>[...list,this.newTodo])
    this.newTodo=''
   }
  }

  removeTodo(index:number){
    this.todos.update(list=>list.filter((_,i)=>i!==index))
  }

  trackByIndex(index: number) {
    return index;
  }

}
