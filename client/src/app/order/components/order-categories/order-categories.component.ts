import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '@app/core/services';
import { Category } from '@app/shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-oredr-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  public categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();

  }

}
