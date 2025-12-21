import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, catchError, forkJoin, Observable, of, ReplaySubject, share, Subject, tap } from 'rxjs';
interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
@Injectable({
  providedIn: 'root',
})
export class RxjsandobservablesService {
  http = inject(HttpClient);
  // private const api_url: string = 'https://api.tvmaze.com/search/shows?q=';
  private apiUrlPlaceholder = 'https://jsonplaceholder.typicode.com';
  logs: string[] = [];
  private user$!: Observable<any>;
  subject = new Subject<string>();
  newSubject = new Subject<number>()
   behaviorSubject = new BehaviorSubject<string>('Initial Value');
   neBehSubject = new BehaviorSubject<number>(1)
   private messageSubject = new ReplaySubject<string>(5); // Last 5 messages
  messages$ = this.messageSubject.asObservable();

  getPostFromUsers(userId: number) {
    return this.http
      .get(`${this.apiUrlPlaceholder}/posts?userId=${userId}`)
      .pipe(tap(() => this.log(`Fetched posts for user ${userId}`)));
  }

  log(message: string) {
    this.logs.push(`${new Date().toLocaleTimeString()}: ${message}`);
  }

  public data$: Observable<{ user: IUser; posts: IPost[]; comments: IComment[] }> = forkJoin({
    user: this.http.get<IUser>('https://jsonplaceholder.typicode.com/users/1'),
    posts: this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts?userId=1'),
    comments: this.http.get<IComment[]>('https://jsonplaceholder.typicode.com/comments?postId=1'),
  });

  public data1$: Observable<{ user: IUser | null; posts: IPost[]; comments: IComment[] }> =
    forkJoin({
      user: this.http
        .get<IUser>('https://jsonplaceholder.typicode.com/users/wrong-api-route')
        .pipe(catchError(() => of(null))),
      posts: this.http
        .get<IPost[]>('https://jsonplaceholder.typicode.com/posts?userId=1')
        .pipe(catchError(() => of([]))),
      comments: this.http
        .get<IComment[]>('https://jsonplaceholder.typicode.com/comments?postId=1')
        .pipe(catchError(() => of([]))),
    });

    getUserData(): Observable<any> {
    if (!this.user$) {
      this.user$ = this.http.get(`https://jsonplaceholder.typicode.com/users`).pipe(
        share(),
      );
    }
    return this.user$;
  }

  sendMessage(msg: string) {
    this.messageSubject.next(msg);
  }

  uploadFile(file: File): Observable<string> {
    const resultSubject = new AsyncSubject<string>();

    // Simulate API call
    setTimeout(() => {
      resultSubject.next('File uploaded successfully!');
      resultSubject.complete();
    }, 2000);

    return resultSubject.asObservable();
  }

}
