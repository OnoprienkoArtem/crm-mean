import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalConfirmComponent } from '@app/shared/components';
import { Message } from '@app/shared/interfaces';
import { Category } from '@app/shared/interfaces/category';
import { MaterializeService } from '@app/shared/materialize/materialize.service';

import { CategoriesService } from '@app/core/services';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: [ './categories-new.component.scss' ]
})
export class CategoriesNewComponent implements OnInit {
  public form: FormGroup;
  public isNew: boolean = true;
  public imagePreview: string | ArrayBuffer | null = '';

  private image: File;
  private category: Category;

  @ViewChild('fileInput') fileInputRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getCategoryById();
  }

  public onSubmit(): void {
    let observable$: Observable<Category>;
    this.form.disable();

    if (this.isNew) {
      observable$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      const id: string | null = this.route.snapshot.paramMap.get('id');
      observable$ = this.categoriesService.update(id, this.form.value.name, this.image);
    }

    observable$.subscribe(
      (): void => {
        MaterializeService.toast('Changes saved!');
        this.form.enable();
      },
      (error: HttpErrorResponse): void => {
        MaterializeService.toast(error.error.message);
        this.form.enable();
      },
    );
  }

  public triggerClick(): void {
    this.fileInputRef.nativeElement.click();
  }

  public onFileUpload(event: any): void {
    this.image = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => this.imagePreview = reader.result;
    reader.readAsDataURL(this.image);
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
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
          this.category = category;
          this.form.patchValue({
            name: category.name,
          });
          this.imagePreview = category.imageSrc!;
          MaterializeService.updateTextInputs();
        }
        this.form.enable();
      },
      (error: HttpErrorResponse): void => MaterializeService.toast(error.error.message),
    );
  }

  public deleteCategory(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        name: this.category.name,
      },
    });

    dialogRef.afterClosed().pipe(
      filter(Boolean),
      switchMap((): Observable<Message> => this.categoriesService.delete(this.category._id)),
      tap((message: Message): void => MaterializeService.toast(message.message)),
      catchError((error: HttpErrorResponse): Observable<void> => of(MaterializeService.toast(error.error.message))),
      tap((): Promise<boolean> => this.router.navigate(['/categories'])),
    ).subscribe();
  }
}
