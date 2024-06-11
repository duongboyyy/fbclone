import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAddDivAfterSixth]'
})
export class AddDivAfterSixthDirective implements OnInit {

  @Input() index!: number;
  @Input() remainingCount!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.index >= 6) {
      const overlayDiv = this.renderer.createElement('div');
      this.renderer.setStyle(overlayDiv, 'position', 'absolute');
      this.renderer.setStyle(overlayDiv, 'top', '0');
      this.renderer.setStyle(overlayDiv, 'left', '0');
      this.renderer.setStyle(overlayDiv, 'width', '100%');
      this.renderer.setStyle(overlayDiv, 'height', '100%');
      this.renderer.setStyle(overlayDiv, 'background-color', 'rgba(0, 0, 0, 0.5)'); // Màu sắc của overlay với độ trong suốt
      this.renderer.setStyle(overlayDiv, 'pointer-events', 'none');

      const textDiv = this.renderer.createElement('div');
      const text = this.renderer.createText(`+${this.remainingCount}`);
      this.renderer.appendChild(textDiv, text);
      this.renderer.setStyle(textDiv, 'position', 'absolute');
      this.renderer.setStyle(textDiv, 'top', '50%');
      this.renderer.setStyle(textDiv, 'left', '50%');
      this.renderer.setStyle(textDiv, 'transform', 'translate(-50%, -50%)');
      this.renderer.setStyle(textDiv, 'color', 'white');
      this.renderer.setStyle(textDiv, 'font-size', '24px');
      this.renderer.setStyle(textDiv, 'font-weight', 'bold');
      this.renderer.setStyle(textDiv, 'pointer-events', 'none');

      this.renderer.appendChild(this.el.nativeElement, overlayDiv);
      this.renderer.appendChild(overlayDiv, textDiv);
    }
  }

}
