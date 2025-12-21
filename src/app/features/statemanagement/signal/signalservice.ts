import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class Signalservice {
  private count = signal(0);
   todo = signal<Todo[]>([]);
   loading = signal(false);

  // double the count computer signals
  doublecount = computed(() => this.count() * 2);
  completedTodos:any = computed(() => {
    this.todo().filter((todos) => todos.completed);
  });
  pendingTodos:any = computed(() => {
    this.todo().filter((todos) => !todos.completed);
  });

  constructor(private http: HttpClient) {}

  increment() {
    this.count.update((count) => count + 1);
  }

  decrement() {
    this.count.update((count) => count - 1);
  }
  reset() {
    this.count.update((count) => (count = 0));
  }
  getCount() {
    return this.count;
  }

  async fetchTodos(){
    this.loading.set(true)
    try{
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json()
      this.todo.set(data)
    }finally{
     this.loading.set(false)
    }
  }

  addtodo(title:string){
     const newTodo:Todo ={
      id:Date.now(),
      title,
      completed:false
     }
     this.todo.update(current=>[...current,newTodo])
  }

  toggleTodo(id:number){
    this.todo.update(todos=>todos.map(todo=>todo.id === id ? {...todo,completed:!todo.completed }:todo))
  }
}
