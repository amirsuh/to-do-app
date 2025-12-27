import { Component } from '@angular/core';
import { GroceryComponent } from "../components/grocery/grocery.component";
import { BucketComponent } from "../components/bucket/bucket.component";

@Component({
  selector: 'app-ngrx-main-comp',
  imports: [GroceryComponent, BucketComponent],
  templateUrl: './ngrx-main-comp.html',
  styleUrl: './ngrx-main-comp.scss',
})
export class NgrxMainComp {

}
