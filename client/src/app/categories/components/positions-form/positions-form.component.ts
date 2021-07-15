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
  public loading: boolean = false;

  @Input() categoryId: string


  constructor(private positionService: PositionsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe((positions: Position[]) => {
      this.positions = positions;
      this.loading = false;
    });
  }

}
