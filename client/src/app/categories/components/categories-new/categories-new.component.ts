import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Category } from '@app/shared/interfaces/category';
import { MaterializeService } from '@app/shared/materialize/materialize.service';

import { CategoriesService } from '@app/shared/services';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss']
})
export class CategoriesNewComponent implements OnInit {
  public form: FormGroup;
  public isNew: boolean = true;

  @ViewChild('fileInput') fileInputRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getCategoryById();
  }

  public onSubmit(): void {

  }

  private getCategoryById(): void {
    this.form.disable();

    this.route.params.pipe(
      switchMap((params: Params): Observable<Category | null> => {
        if (params['id']) {
          this.isNew = false;
          return this.categoriesService.getById(params['id']);
        }

        return of(null);
      })
    ).subscribe(
      (category: Category | null): void => {
        if (category) {
          this.form.patchValue({
            name: category.name,
          });

          MaterializeService.updateTextInputs();
        }
        this.form.enable();
      },
      (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
    );
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }


  public triggerClick(): void {
    this.fileInputRef.nativeElement.click();
  }
}
