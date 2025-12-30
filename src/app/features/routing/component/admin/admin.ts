import { Component } from '@angular/core';
import { Singleton } from '../../../../core/services/singleton/singleton';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {


  constructor(private single:Singleton){
single.increment()
   this.single.log('admin')
   console.log(this.single.varTocheckSingleton,single.getCounter())
  }
}
