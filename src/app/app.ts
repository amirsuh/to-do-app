import { Component, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Grocery } from './features/ngrx/models/grocery.model';
import {
  selectByGroceryTpye,
  selectGroceries,
} from './features/ngrx/store/selector/grocer.selector';
import { groceryAction } from './features/ngrx/store/actions/grocery.action';
import { medGroceryAction } from './features/medicine-ngrx/store/actions/medgros.actions';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class App {
  protected readonly title = signal('todo-app');
  // parentMessage:string = signal('this is child msg')
  parentMessage: string = 'jdg bg';
  sharedCount: number = 0;
  //WritableSignal<string> = signal('fgcr');
  newTodo = '';
  todos = signal<string[]>([]);
  isMenuActive = false;
  selectedCountry: any;
  isOpen = false;

  menus = [
    { label: 'Dashboard', selected: false },
    { label: 'Users', selected: false },
    { label: 'Reports', selected: false },
    { label: 'Settings', selected: false },
  ];
  constructor(private router: Router, private store: Store<{ gorcery: any[] }>) {
    // code for chech memoization
    // store.select(selectGroceries).subscribe(res=>{
    //   console.log('data2', res)
    // })

    this.store.dispatch(groceryAction.loadGroceris());
    this.store.dispatch(medGroceryAction.loadMedGroceris());
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  onSelect(item: any) {
    item.selected = !item.selected;
  }
  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.update((list) => [...list, this.newTodo]);
      this.newTodo = '';
    }
  }

  removeTodo(index: number) {
    this.todos.update((list) => list.filter((_, i) => i !== index));
  }

  trackByIndex(index: number) {
    return index;
  }

  // Method to toggle the menu on mobile
  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
  gotoFromDrpDwn(event: any) {
    let url = '';
    switch (event.label) {
      case 'Dashboard':
        url = 'routing/admin';
        break;
      case 'Users':
        url = 'routing/home';
        break;
      case 'Reports':
        url = 'routing/lazy';
        break;
      case 'Settings':
        url = 'routing/profile';
        break;
      default:
        url = 'routing';
    }
    this.router.navigateByUrl(url);
  }
}
