import { Component, signal } from '@angular/core';
import { Paginationservice } from '../paginationservice';
import { map, tap } from 'rxjs';
import { Product } from '../interface/pagination.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-try-paginationbyself',
  imports: [CommonModule],
  templateUrl: './try-paginationbyself.html',
  styleUrl: './try-paginationbyself.scss',
})
export class TryPaginationbyself {
productsData = signal<Product[]>([])
startIndex=0
endIndex=0
PAGE_SIZE= 10
totalproduct=0
noOfPages=0
currentPage=0
public numbers: number[] = [];
productsWitPagination: any;
constructor(private paginationService:Paginationservice){}

ngOnInit(){
  this.paginationService.getProducts().pipe(tap(originatProduct=>{
    this.noOfPages = Math.ceil(originatProduct.products.length/this.PAGE_SIZE);
    this.productsWitPagination = originatProduct.products;
    this.numbers = [...Array(this.noOfPages).keys()]
  }),map(product=> product.products.slice(this.startIndex,this.PAGE_SIZE))).subscribe(res=>{
    this.productsData.set(res)
  })
}
gotoNextPage(page:number){

  if(page>this.noOfPages)return
  this.currentPage = page
  this.startIndex = page*this.PAGE_SIZE
  this.endIndex = this.startIndex+this.PAGE_SIZE
  const products = this.productsWitPagination.slice(this.startIndex,this.endIndex)
  console.log(products)
  this.productsData.set(products)
}

nextPage(){
  if(this.currentPage>=0){
 this.gotoNextPage(this.currentPage+1)

  }
}
prevPage(){
  if(this.currentPage>=0){
this.gotoNextPage(this.currentPage-1)

  }
}
}
