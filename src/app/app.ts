import { Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation:ViewEncapsulation.ShadowDom
})
export class App {
  protected readonly title = signal('todo-app');
    // parentMessage:string = signal('this is child msg')
  parentMessage: string='jdg bg'
  sharedCount:number=0
  //WritableSignal<string> = signal('fgcr');
  newTodo = '';
  todos = signal<string[]>([]);
isMenuActive = false;


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

  // Method to toggle the menu on mobile
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
}
