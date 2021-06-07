import { Component, OnInit, Input } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss']
})
export class FormErrorComponent implements OnInit {

  @Input() control!: AbstractControl;

  constructor() { }

  ngOnInit(): void { }
}
