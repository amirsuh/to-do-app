import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, Products } from './interface/pagination.interface';
import { filter, map, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Paginationservice {
  http = inject(HttpClient)
  apiUrl:string="https://dummyjson.com/products"
  lengthOfProduct = 0
  //new Subject<number>()


  getProducts(){
    return this.http.get<any>(this.apiUrl+'?limit=500')
    //.pipe(tap(res=>this.lengthOfProduct=res.products.length))
  }
}
