import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {ErrorMessages} from "../../login-page/error-message.config";

@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

  texts: ErrorMessages[] | undefined;

  @Input() control!: AbstractControl;
  @Input() set errorMessages(errorMessages: ErrorMessages[]) {

  };



  constructor() { }

  ngOnInit(): void {
    console.log(this.texts)

  }




}
