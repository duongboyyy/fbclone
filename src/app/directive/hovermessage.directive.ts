import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHovermessage]'
})
export class HovermessageDirective {

  constructor(private el:ElementRef) { }
  

}
