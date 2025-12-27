import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MedGrocery } from '../../model/medgrocery.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToMedBucket, removeToMedBucket } from '../../store/actions/medbucket.action';
import { selectGroceryByType, selectMedGroceris } from '../../store/selector/medgros.selector';

@Component({
  selector: 'app-medicine-storage',
  imports: [CommonModule],
  templateUrl: './medicine-storage.html',
  styleUrl: './medicine-storage.scss',
})
export class MedicineStorage {
  medGroceries$?: Observable<MedGrocery[]>;
  // groceries$:Signal<Grocery[]>;

  filteredMedGoceries$?: Observable<MedGrocery[]>;
  // filteredGoceries$?:Signal<Grocery[]>
  constructor(private store: Store<{ medGrocery: MedGrocery[] }>) {
    this.medGroceries$ = store.select(selectMedGroceris);
    // this.medGroceries$ = store.select(selectGroceryByType)
    // store.select("medGrocery").subscribe(res=>{
    //   console.log(res)
    // })
  }

  onTypeChange(event: Event) {
    const value=(event.target as HTMLSelectElement).value;
    if(value) this.filteredMedGoceries$ = this.store.select(selectGroceryByType(value))
    else this.filteredMedGoceries$ = undefined
    }
  increment(data: MedGrocery) {
    const payload = {
      id: data.id,
      medicineId: data.medicineId,
      brandName: data.brandName,
      genericName: data.genericName,
      category: data.category,
      dosageMg: data.dosageMg,
      manufacturer: data.manufacturer,
      price: data.price,
      requiresPrescription: data.requiresPrescription,
      quantity: 1,
    };
    this.store.dispatch(addToMedBucket({ payload }));
  }
  decrement(item: MedGrocery) {
    const payload = {
      id: item.id,
    };
    this.store.dispatch(removeToMedBucket({ payload }));
  }
}
