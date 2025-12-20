import { Component, ElementRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { RxjsandobservablesService } from './service/rxjsandobservables';
import { HttpClient } from '@angular/common/http';
import { fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'app-rxjsandobservables',
  imports: [],
  templateUrl: './rxjsandobservables.html',
  styleUrl: './rxjsandobservables.scss',
})
export class Rxjsandobservables implements OnInit{
@ViewChild('showsInput', { static: true }) showsInput!:ElementRef;
@ViewChild('showsInputText',{static:true}) showsInputText!:ElementRef
private readonly apiUrl: string = 'https://api.tvmaze.com/search/shows?q=';
private readonly apiUrlforcat:string='https://api.artic.edu/api/v1/artworks/search?q='
http = inject(HttpClient)

ngOnInit() {
  fromEvent(this.showsInput.nativeElement, 'input').subscribe((event: any) => {
      const query = (event.target as HTMLInputElement).value;
      this.http.get(`${this.apiUrl}${query}`).subscribe(response => {
        console.log(response);
      },
      (error) => {
        console.error('Error fetching shows:', error);
      });
    });

    fromEvent(this.showsInputText.nativeElement,'input').subscribe((event:any)=>{
      const q = (event.target as HTMLInputElement).value
      this.http.get(`${this.apiUrlforcat}${q}`).pipe(
        tap(data => console.log('Before mapping:', data)),
        map((user:any) => user.data),
        tap(data=>console.log(data))
      ).subscribe(res=>{
        console.log(res)
      })
    })
}

}
