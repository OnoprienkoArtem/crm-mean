import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterializeModalInstance, MaterializeService } from '@app/shared/materialize/materialize.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  public isRoot: boolean;
  public modal: MaterializeModalInstance;

  @ViewChild('modal') modalRef: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });


  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.initModal(this.modalRef);
  }

  public openModal(): void {
    this.modal.open();
  }

  public cancel(): void {
    this.modal.close();
  }

  public submit(): void {
    this.modal.close();
  }
}
