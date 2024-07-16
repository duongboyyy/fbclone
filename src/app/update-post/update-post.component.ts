import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { PostService } from '../services/post.service';
import { PostComponent } from '../post/post.component';
import { file } from '../model/file';
import { Post } from '../model/post';
import { Postuser } from '../model/postuser';
import { cloneDeep } from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  private _postuserdetail!: Postuser | undefined;
  @Input()
  set postuserdetail(value: Postuser | undefined) {
    if (value) {
      this._postuserdetail = cloneDeep(value);
    }
  }

  get postuserdetail(): Postuser | undefined {
    return this._postuserdetail;
  }
  //@Input() postuserdetail!:Postuser | undefined
  post:string=""
  title = 'Update post';
  postmodel!:Post
  username!:any
  imageList:any[]=[];
  file!:file
  text: string = 'modal';
  @ViewChild(PostComponent) postComponent!: PostComponent
  uploadingImages = false;
  remove:boolean=false
  @Output() postUpdated = new EventEmitter<void>();
  constructor(private postService: PostService,
    private router: Router,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,

    ) {
      
    }
  ngOnInit(): void {
    this.username=localStorage.getItem("userName")
    this.postmodel = {
      id:0,
      time: new Date(),
      userId: "",
      share: 0,
      body: '',
      like: 0,
      cmt:0,
      slug:'2d6ffb14-b819-4319-ae39-3e6e4be5bf37'
    };
    this.file={
      id:'2d6ffb14-b819-4319-ae39-3e6e4be5bf37',
      postId:0,
      image:'',
      video:''
    }
  }
  UpdatePost(){
    
    if(this.postuserdetail){
      this.postmodel.body=this.post
      this.postmodel.userId=this.postuserdetail.userId
      this.postmodel.like=this.postuserdetail?.like
      this.postmodel.share=0
      this.postmodel.time=this.postuserdetail.time
      if(this.remove){
        this.postService.delUpload(this.postuserdetail.id).subscribe()
      }
       this.postService.updatePost(this.postuserdetail?.id,this.postmodel)
          .subscribe( () => {
            if(this.postuserdetail)
             this.saveImage(this.postuserdetail?.id)
            this.postUpdated.emit();
          }, (error:any) => {
            console.error('Error creating post:', error);
          });
    }
  }
  onFileSelectedUpdate(event: any): void {
    const files1 = event.target.files;
    this.imageList= event.target.files;
    if (files1) {
      for (let file of files1) {
        const reader1 = new FileReader();
        reader1.onload = (e: any) => {
          this.postuserdetail?.uploads.push({
            id:"",
            image:e.target.result,
            postId:0,
            video:""
          });
        };
        reader1.readAsDataURL(file);
      }
    }
  }
  get remainingCount() {
    return (this.postuserdetail?.uploads?.length || 0) - 6;
  }
  async saveImage(id:number){
    console.log(this.imageList)
    if(this.imageList){
      for(let item of this.imageList){
        const nameImg = this.getCurrentDateTime() + item.name;
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg, item).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(async (url) => {
              this.file.id="2d6ffb14-b819-4319-ae39-3e6e4be5bf37";
              this.file.postId=id;
              this.file.image=url;
              this.file.video="";
              await this.postService.uploadImage(this.file).subscribe(async res=>{
                await console.log(res)
              });
            });
          })
        ).subscribe();
      }
    }
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  removeImagePreview(){
    this.imageList=[]
    this.postuserdetail?.uploads.forEach(element => {
      element.image=""
    });
    this.remove=true
  }
}
