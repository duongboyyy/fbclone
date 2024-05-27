import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  post:string="hello word"
  title = 'Create a new Post';
  postmodel!:Post
  
  public Editor = DecoupledEditor;

  public onReady( editor: DecoupledEditor ): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postmodel = {
      idPost: 0,
      time: new Date(),
      idUser: "1",
      share: 0,
      body: '',
      like: 0
    };
    
  }
  CreatePost(){
    
    this.postmodel.body=this.post
    this.postmodel.idPost=this.RandomId()
    this.postmodel.idUser="1"
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

  RandomId(): number{
    const randomIndex = Math.floor(Math.random()*999999);
    return randomIndex;
  }
}
