import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Singleton } from '../../../../core/services/singleton/singleton';
import { debounceTime, filter, map, Observable, Subject } from 'rxjs';
import { Product } from '../model.ts/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhonePipe } from "../../../../shared/pipes/phone/phonepipe-pipe";

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, PhonePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  productList$?:Observable<Product[]>
  filteredList$?:Observable<Product[]>
  searchText:string = ''
  searchSubject = new Subject<string>();
  sortColumn: keyof Product = 'title'; // default sort
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private route: ActivatedRoute,private single:Singleton) {
    this.route.data.subscribe({
      next: (data) => {
        console.log(data); // handle resolved data here
      },
      complete: () => {
        console.log('Route data observable completed');
      },
    });
    this.productList$ = this.single.getPrdoctList()
    this.searchSubject.pipe(debounceTime(500),map(searchTxt => (searchTxt || '').toLowerCase())).subscribe(searchTxt=>{
      this.filteredList$ = this.productList$?.pipe(map(items=>items.filter(item => {
      const brand = (item.brand || '').toLowerCase();
      const title = (item.title || '').toLowerCase();
      const description = (item.description || '').toLowerCase();

      return brand.includes(searchTxt) ||
             title.includes(searchTxt) ||
             description.includes(searchTxt);
    }).sort((a, b) => this.sortItems(a, b))))
    })
  }

  onSearchChange(event:any){
    let text =  event ? event:this.searchText
    this.searchSubject.next(text)
  //  let searchTxt = event
  //  this.filteredList$ = this.productList$?.pipe(map(items=>items.filter(item => {
  //     const brand = (item.brand || '').toLowerCase();
  //     const title = (item.title || '').toLowerCase();
  //     const description = (item.description || '').toLowerCase();

  //     return brand.includes(searchTxt) ||
  //            title.includes(searchTxt) ||
  //            description.includes(searchTxt);
  //   })))
  }


   sortItems(a:Product,b:Product){
    const vA = a[this.sortColumn]
    const vB = b[this.sortColumn]
    if(vA<vB) return this.sortDirection ==='asc' ? -1:1
    if(vA<vB) return this.sortDirection ==='asc' ? 1:-1
    return 0
   }

   toggleSort(colum:keyof Product){
     if(this.sortColumn=colum){
      this.sortDirection = this.sortDirection ==='asc' ? 'desc' : 'asc'
     }else {
      this.sortColumn = colum;
      this.sortDirection = 'asc';
    }

    // Trigger a re-evaluation of filteredList$
    this.searchSubject.next(this.searchText);
   }
}
