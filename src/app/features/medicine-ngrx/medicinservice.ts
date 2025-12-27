import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Medicinservice {
  constructor(private http:HttpClient) {}
    fetchAllMedGroceries(){
    return this.http.get("http://localhost:5000/medicines")
  }
}
