import { Component } from '@angular/core';
import { Singleton } from '../../../../core/services/singleton/singleton';
import { Admin } from "../admin/admin";
import { Lazy } from "../lazy/lazy";

@Component({
  selector: 'app-home',
  imports: [Admin, Lazy],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers:[Singleton]
})
export class Home {

   cardTitle = 'Sample Card';
  cardDescription = 'This is a sample card description.';

  // Define buttons dynamically here
  cardButtons = [
    { label: 'Edit', action: this.edit },
    { label: 'Delete', action: this.delete }
  ];

  constructor(private single:Singleton){
   single.getCounter()
   single.increment()
   this.single.log('hadd')
   single.increment()
   single.increment()
   single.increment();single.increment()

   console.log(this.single.varTocheckSingleton,single.getCounter())
  }


  edit() {
    console.log('Edit clicked');
  }

  delete() {
    console.log('Delete clicked');
  }
}
