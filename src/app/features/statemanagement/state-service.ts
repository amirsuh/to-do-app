import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
interface User{
  id:number,name:string,email:string
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
private beSubject = new BehaviorSubject<User | null>(null)
user$ = this.beSubject.asObservable()

setUser(user:User){
  this.beSubject.next(user)
}
getUser(){
 return this.beSubject.getValue()
}
clearUser(){
  this.beSubject.next(null)
}
}
