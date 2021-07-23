import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PositionsService } from '@app/core/services';
import { Position } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

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
  }

}
