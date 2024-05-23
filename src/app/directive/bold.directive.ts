import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {

  constructor(private el:ElementRef) { }
  private bold(){
    this.el.nativeElement.style.fontWeight=700
  }
}
