import {Directive, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';


@Directive({
  selector: '[appFormError]'
})
export class FormErrorDirective implements OnInit  {



  @Input('appFormError') controlName!: AbstractControl;
  @Input() errorMessages: any;

  constructor()  { }

  ngOnInit(): void {

  }






}
