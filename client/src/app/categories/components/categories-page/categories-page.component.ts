import { Component, OnInit } from '@angular/core';
import { Category } from '@app/shared/interfaces/category';

import { CategoriesService } from '@app/shared/services/categories.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {

  public categories: Category[];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.fetch().subscribe(categories => {
      console.log(categories);
      this.categories = categories;
    });
  }

}
