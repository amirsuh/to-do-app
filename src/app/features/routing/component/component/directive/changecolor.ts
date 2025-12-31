// import { Directive, HostListener, Input, OnInit } from '@angular/core';

// @Directive({
//   selector: '[appChangecolor]',
// })
// export class Changecolor implements OnInit{
// @Input('appColor') color!:string
//   constructor() { }
// @HostListener('style.color') textColor!:string

// ngOnInit(){
// this.textColor = this.color
// }


// }
import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangecolor]',
})
export class ChangecolorDirective implements OnInit {
  @Input('appChangecolor') color!: string;   // use the directive name itself as input

  constructor(private el: ElementRef, private renderer: Renderer2) {}

 @HostBinding('style.color') textColor!:string;

  ngOnInit() {
    this.textColor = this.color
    //this.renderer.setStyle(this.el.nativeElement, 'color', this.color || 'red');
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.textColor = 'red'
  }
    @HostListener('mouseleave') onMouseLeave(){
    this.textColor = this.color
  }
}
