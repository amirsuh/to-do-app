import { ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { Paginationservice } from '../paginationservice';
import { Product } from '../interface/pagination.interface';
import { CommonModule } from '@angular/common';
import { map, tap } from 'rxjs';
import { TryPaginationbyself } from "../try-paginationbyself/try-paginationbyself";

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, TryPaginationbyself],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})
export class Pagination implements OnInit{
  productsData: WritableSignal<Product[]> = signal<Product[]>([]);
  PAGE_SIZE: number = 10;
  totalProducts: number = 0;
  noOfPages: number = 0;
  startIndex: number = 0;
  public numbers: number[] = [];
  productsWitPagination: any;
  currentpage=0;
  //[...Array(10).keys()];
  constructor(private paginationService: Paginationservice) {}

  ngOnInit() {
    console.log(this.numbers);
    this.paginationService
      .getProducts()
      .pipe(
        tap((res) => {
          this.noOfPages = Math.ceil(res.products.length / this.PAGE_SIZE);
          this.numbers = [...Array(this.noOfPages).keys()];
          this.productsWitPagination =res.products
        }),
        map((product) => product.products.slice(this.startIndex,this.startIndex +this.PAGE_SIZE))
      )
      .subscribe((res: any) => {
        this.productsData.set(res);
      });
  }

  gotoNextPage(page:number){
if(page<1||page>this.noOfPages) return;

   this.currentpage = page;
   this.startIndex = page * this.PAGE_SIZE
   const endIndex = this.startIndex+this.PAGE_SIZE
   const products = this.productsWitPagination.slice(this.startIndex,endIndex)
   this.productsData.set(products)
   console.log(products)
  }
}
