import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClick]'
})
export class ClickDirective {

  constructor(private el: ElementRef) { }
  @HostListener('click') onclick(){
    const links= document.querySelectorAll('.nav-link');
    links.forEach(l=>{
      l.classList.remove('active')
    })
    this.el.nativeElement.classList.add('active');
  }
  
}
