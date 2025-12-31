import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Product } from '../../../features/routing/component/model.ts/product.model';
import { Products } from '../../../features/dummyjson/interface/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class Singleton {
  varTocheckSingleton: number = 0;
  user: any;
  private counter: number = 0;
  private http = inject(HttpClient);

  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  increment(): void {
    this.counter++;
  }
  getCounter(): number {
    return this.counter;
  }
  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      return this.fetchUserData(username).pipe(
        map((userData) => this.user = userData
          //return of({userData:this.user,status:'true'});
        )
      );
    }
    return of(false);
  }
  fetchUserData(username: string): Observable<any> {
    const body = {
    username: 'emilys',       // or use the username parameter
    password: 'emilyspass',
    expiresInMins: 30
  };
      return this.http.post('https://dummyjson.com/auth/login', body, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: false // ✅ equivalent to credentials: 'include'
  });
    // return this.http.post('https://dummyjson.com/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     username: 'emilys',
    //     password: 'emilyspass',
    //     expiresInMins: 30, // optional, defaults to 60
    //   }),
    //   credentials: 'include', // Include cookies (e.g., accessToken) in the request
    // });
  }
  isAuthenticated(): boolean {
    return this.user !== null;
  }

  getPrdoctList():Observable<Product[]>{
    return this.http.get<Products>('https://dummyjson.com/products').pipe(
      map(
        product=>product.products
      ))
  }
}
