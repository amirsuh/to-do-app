import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToBucket, removeFromBucket } from '../../store/actions/bucket.action';


@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {

  groceries$?:Observable<Grocery[]>;

  constructor(private store:Store<{gorcery:Grocery[]}>){
     this.groceries$ = store.select("gorcery")
  }


  onTypeChange(event: Event){

  }


  increment(item:Grocery){
    const payload = {
      id:item.id,
      name:item.name,
      quantity:1
    }
    // we can do like this
   // this.store.dispatch({type:'Update',payload:payload})
   // this.store.dispatch(addToBucket({id:payload.id,name:payload.name}))
     this.store.dispatch(addToBucket({payload}))

  }
  decrement(item:Grocery){
    const payload = {
      id:item.id
        }

this.store.dispatch(removeFromBucket({payload}))

  }

}
