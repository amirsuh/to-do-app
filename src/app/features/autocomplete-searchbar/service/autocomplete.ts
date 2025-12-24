import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
 http = inject(HttpClient)

 searchRecipe(searchText:any){
  return this.http.get("https://dummyjson.com/recipes/search?q="+searchText)
 }

getUser(id:any){
  return this.http.get('https://dummyjson.com/recipes/'+id)
}
}
