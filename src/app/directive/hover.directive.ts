import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el:ElementRef) { }
  @HostListener("mouseenter") onMouse(){
    this.highlight('beige','#ffa500');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('','');
  }
  private highlight(color: string,colortxt: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color=colortxt;
  }
}
