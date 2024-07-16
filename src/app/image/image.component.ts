import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { video } from '../model/video';
import { VideoService } from '../services/video.service';
import { formatDate } from '@angular/common';
import { videoModel } from '../model/videoModel';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  video!:any
  videopreview!:any
  videoModel!:videoModel
  listvideo!:video[]
  title!:string
  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
    private videoservice:VideoService) { }

  ngOnInit(): void {
    this.videoModel={
      id:"2d6ffb14-b819-4319-ae39-3e6e4be5bf37",
      title:"",
      url:"",
      userId:""
    }
    this.loadVideo();
  }
  loadVideo(){
    this.videoservice.getAll().subscribe(res=>{
      this.listvideo=res
    })
  }
  onFileSelected(event: any): void {
    const files = event.target.files;
    this.video= event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.videopreview=e.target.result;
          console.log(e.target.result)
        };
        reader.readAsDataURL(file);
      }
    }
  }
  async saveImage(){
    if(this.video){
      const nameVideo = this.getCurrentDateTime() + this.video[0].name;
      const fileRef = this.storage.ref(nameVideo);

      console.log(this.video[0])
      this.storage.upload(nameVideo, this.video[0]).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(async (url) => {
            this.videoModel.id="2d6ffb14-b819-4319-ae39-3e6e4be5bf37";
            this.videoModel.title=this.title;
            this.videoModel.url=url;
            this.videoModel.userId=localStorage.getItem("userid")!;
            this.videoservice.postVideo(this.videoModel).subscribe(res=>{
              console.log(res)
            });
          });
        })
      ).subscribe();
    }
  }
  
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  removePreview(){
    this.videopreview="";
  }
}
