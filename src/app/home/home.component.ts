import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { formatDate } from '@angular/common';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  post:string="hello word"
  title = 'Create a new Post';
  postmodel!:Post
  username!:any
  public Editor = DecoupledEditor;

  public onReady( editor: DecoupledEditor ): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  constructor(private postService: PostService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("userName")
    this.postmodel = {
      time: new Date(),
      userId: "",
      share: 0,
      body: '',
      like: 0,
      slug:'2d6ffb14-b819-4319-ae39-3e6e4be5bf37'
    };
    
  }
  CreatePost(){
    
    this.postmodel.body=this.post
    this.postmodel.userId=localStorage.getItem("userid")!
    this.postmodel.like=0
    this.postmodel.share=0
    this.postmodel.time=new Date();

    this.postService.createPost(this.postmodel).subscribe((response) => {
      console.log('Post created successfully:', response);
    }, (error) => {
      console.error('Error creating post:', error);
    });

    console.log(this.postmodel)
  }

  imagePreviews: string[] = [];
  imageList:any[]=[];
  onFileSelected(event: any): void {
    const files = event.target.files;
    this.imageList= event.target.files;
    if (files) {
      //this.imagePreviews = [];
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
          
        };
        reader.readAsDataURL(file);
      }
    }
  }
  get remainingCount() {
    return this.imagePreviews.length - 6;
  }
  save(){
    if(this.imageList){
      for(let item of this.imageList){
        const nameImg = this.getCurrentDateTime() + item.name;
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg, item).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
    
              //this.formCreateVaccine.patchValue({imgVaccine: url});
    
              // Call API to create vaccine
              // this.vaccineService.createVaccineDTO(this.formCreateVaccine.value).subscribe(() => {
              //   this.router.navigateByUrl('vaccine-list').then(r => this.alertService.showMessage("Thêm mới thành công!"));
              // })
            });
          })
        ).subscribe();
      }
    }
    console.log(this.imageList);
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
