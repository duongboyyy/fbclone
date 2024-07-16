import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, HostListener, ViewContainerRef } from '@angular/core';
import { BoxChatComponent } from '../box-chat/box-chat.component';


@Directive({
  selector: '[appShowbox]'
})
export class ShowboxDirective {

  constructor(
    private el: ElementRef,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }
  right=80;
  @HostListener('click') onclick(){

    if (!this.el.nativeElement.classList.contains("active")){
      const factory = this.resolver.resolveComponentFactory(BoxChatComponent);
      const componentRef: ComponentRef<BoxChatComponent> = this.viewContainerRef.createComponent(factory);
      const boxChatElement = componentRef.location.nativeElement;
      const existingRight =++ this.right;
      const newRight = existingRight + 80; 
      boxChatElement.style.right = newRight + 'px';

      this.el.nativeElement.appendChild(boxChatElement);
      console.log(this.el.nativeElement.classList.contains("active"))
      this.el.nativeElement.classList.add("active")
      
    }

  }
}
