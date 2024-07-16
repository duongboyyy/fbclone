import { Component, Input, OnInit } from '@angular/core';
import { Postuser } from '../model/postuser';
import { file } from '../model/file';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
  @Input() listImage!:file[]
  @Input() index!:number
  @Input() item!:Postuser
  @Input() idmodal!:string
  constructor() { }

  ngOnInit(): void {
  }
  previous(){
    if(this.index-1<0){
      this.index=this.listImage.length-1
    }else
    this.index--;
    console.log(this.index)
  }
  next(){
    if(this.index+1>this.listImage.length-1){
      this.index=0;
    }else
    this.index++;
    console.log(this.index)
  }
}
