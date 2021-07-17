import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Position } from '@app/shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) { }

  public fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`);
  }

  public create(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }

  public update(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position);
  }
}
