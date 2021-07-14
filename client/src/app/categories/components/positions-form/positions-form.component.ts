import { Component, Input, OnInit } from '@angular/core';
import { PositionsService } from '@app/core/services';
import { Position } from '@app/shared/interfaces';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit {

  public positions: Position[] = [];

  @Input() categoryId: string


  constructor(private positionService: PositionsService) { }

  ngOnInit(): void {
    this.positionService.fetch(this.categoryId).subscribe((position: Position[]) => {

    });
  }

}
