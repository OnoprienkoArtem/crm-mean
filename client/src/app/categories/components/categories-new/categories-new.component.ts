import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss']
})
export class CategoriesNewComponent implements OnInit {
  public form: FormGroup;
  public isNew: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();

    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.isNew = false;
      }
    });
  }

  public onSubmit(): void {

  }

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }


}
