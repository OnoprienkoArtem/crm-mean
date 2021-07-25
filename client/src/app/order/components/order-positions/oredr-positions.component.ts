import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from '@app/core/services';
import { Position } from '@app/shared/interfaces';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-oredr-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OredrPositionsComponent implements OnInit {

  public positions$: Observable<Position[]>

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
  ) { }

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params): Observable<Position[]> => {
        return this.positionsService.fetch(params['id']);
      }),
      map((positions: Position[]) => {
        return positions.map((position: Position) => {
          position.quantity = 1;
          return position;
        })
      }),
    )
  }

  public addToOrder(position: Position): void {

  }
}
