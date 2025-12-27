import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MedBucket } from '../../model/medbucket.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-medicin-bucket',
  imports: [CommonModule],
  templateUrl: './medicin-bucket.html',
  styleUrl: './medicin-bucket.scss',
})
export class MedicinBucket {
myBucket$?:Observable<MedBucket[]>
constructor(private store:Store<{medBucket:MedBucket[]}>){
  this.myBucket$ = store.select("medBucket")

}
}
