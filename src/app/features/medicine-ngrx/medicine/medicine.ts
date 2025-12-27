import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MedicineStorage } from "../components/medicine-storage/medicine-storage";
import { MedicinBucket } from "../components/medicin-bucket/medicin-bucket";

@Component({
  selector: 'app-medicine',
  imports: [MedicineStorage, MedicinBucket],
  templateUrl: './medicine.html',
  styleUrl: './medicine.scss',
})
export class Medicine {
  constructor(){

  }
}
