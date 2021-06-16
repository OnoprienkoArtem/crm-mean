import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '@app/shared/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  public fetch(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category');
  }
}
