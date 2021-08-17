import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Analytics, Overview } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  public getOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytics/overview');
  }

  public getAnalytics(): Observable<Analytics>  {
    return this.http.get<Analytics>('/api/analytics/analytics');
  }
}
