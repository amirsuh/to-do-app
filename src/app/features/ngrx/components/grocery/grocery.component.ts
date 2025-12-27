import { Component, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Grocery } from '../../models/grocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToBucket, removeFromBucket } from '../../store/actions/bucket.action';
import { selectByGroceryTpye, selectGroceries } from '../../store/selector/grocer.selector';


@Component({
  selector: 'app-grocery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grocery.component.html',
  styleUrl: './grocery.component.css'
})
export class GroceryComponent {

  groceries$?:Observable<Grocery[]>;
  // groceries$:Signal<Grocery[]>;

  filteredGoceries$?:Observable<Grocery[]>
    // filteredGoceries$?:Signal<Grocery[]>

  constructor(private store:Store<{gorcery:Grocery[]}>){
    // this.groceries$ = store.selectSignal(selectGroceries)
    this.groceries$ = store.select(selectGroceries)

    // To understand memoization same did in app.ts
    // store.select(selectByGroceryTpye).subscribe(res=>{
    //   console.log('data2', res)
    // })
  }


  onTypeChange(event: Event){

    const selectedtype  =(event.target as HTMLSelectElement).value
    if(selectedtype) this.filteredGoceries$ = this.store.select(selectByGroceryTpye(selectedtype))
    else this.filteredGoceries$=undefined
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
