import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {map, take} from "rxjs/operators";
import {ErrorMessages} from "../../login-page/login-page.component";
import {Observable, Subscription} from "rxjs";



@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

  @Input() control!: AbstractControl;
  @Input() errorMessages: any;


  // public text$: Observable<string> = this.getText();


  constructor() { }

  ngOnInit(): void {


    //
    // this.control.statusChanges.pipe().subscribe(() => {
    //   console.log('statusChanges', this.control);
    // });
    //
    this.control.valueChanges.pipe().subscribe(res => {
      console.log('valueChanges', this.control)
      console.log(res)


    })
  }




}
