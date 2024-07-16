import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { formatDate } from '@angular/common';
import { finalize } from 'rxjs';
import { file } from '../model/file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReloadService } from '../services/reload.service';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { PostComponent } from '../post/post.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit {
  post:string=""
  title = 'Create a new Post';
  postmodel!:Post
  username!:any
  imagePreviews: string[] = [];
  imageList:any[]=[];
  file!:file
  showModal: boolean=false;
  text: string = 'modal';
  public Editor = DecoupledEditor;
  @ViewChild(PostComponent) postComponent!: PostComponent
  uploadingImages = false;

  constructor(private postService: PostService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private modalService: NgbModal,
    private reloadService: ReloadService) { }

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
  async CreatePost(){
    this.postmodel.body=this.post
    this.postmodel.userId=localStorage.getItem("userid")!
    this.postmodel.like=0
    this.postmodel.share=0
    this.postmodel.time=new Date();
    await this.postService.createPost(this.postmodel).subscribe(async (response) => {
      console.log(response.id)
      this.uploadingImages = true;
      await this.saveImage(response.id)
      this.uploadingImages = false;
      setTimeout(async() => {
        if (this.postComponent) {
          await this.postComponent.loadData();
          this.post=''
          this.imagePreviews=[]
          this.imageList=[]
        }
      }, 2000);
    }, (error) => {
      console.error('Error creating post:', error);
    });
    console.log(this.postmodel)
  }
  onFileSelected(event: any): void {
    console.log(event)
    const files = event.target.files;
    this.imageList= event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
          console.log(e.target.result)
        };
        reader.readAsDataURL(file);
      }
    }
  }
  get remainingCount() {
    return this.imagePreviews.length - 6;
  }
  async saveImage(id:number){
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
    this.imagePreviews=[]
    console.log("lcik");
  }
}
