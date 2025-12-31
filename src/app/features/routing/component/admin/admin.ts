import { Component, Input } from '@angular/core';
import { Singleton } from '../../../../core/services/singleton/singleton';
import { CommonModule } from '@angular/common';
import { Main } from "../component/main/main";

@Component({
  selector: 'app-admin',
  imports: [CommonModule, Main],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  @Input() title: string = '';  // Title for the card
  @Input() description: string = '';  // Description for the card
  @Input() buttons: any[] = [];  // Array of buttons (can be of type {label: string, action: Function})

  constructor(private single:Singleton){
   single.increment()
   this.single.log('admin')
   console.log(this.single.varTocheckSingleton,single.getCounter())
   this.single.login('admin','admin').subscribe(res=>{
    console.log(res)
   },err => {
    // This runs on error
    console.error('Error:', err);
  },
  () => {
    // This runs when the observable completes (optional)
    console.log('Completed');
  })
  }
}
