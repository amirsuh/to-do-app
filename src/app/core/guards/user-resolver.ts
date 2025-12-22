import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

export const userResolver: ResolveFn<any> = (route, state) => {
  const http = inject(HttpClient)

  return http.get('https://jsonplaceholder.typicode.com/users');
};
