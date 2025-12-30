import { Component } from '@angular/core';
import { Singleton } from '../../../../core/services/singleton/singleton';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  providers:[Singleton]
})
export class Home {
  constructor(private single:Singleton){
   single.getCounter()
   single.increment()
   this.single.log('hadd')
   single.increment()
   single.increment()
   single.increment();single.increment()

   console.log(this.single.varTocheckSingleton,single.getCounter())
  }
}
