import { Component, OnInit } from '@angular/core';
import { Category } from '@app/shared/interfaces/category';

import { CategoriesService } from '@app/core/services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  public categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch();

    this.categories$.subscribe(res => {
      console.log(res);
    });

  }

}
