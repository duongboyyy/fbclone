import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';
import { User } from '../model/user';
import { Postuser } from '../model/postuser';
import { CommentModel } from '../model/commentModel';
import { delay, forkJoin, mergeMap, observable, switchMap } from 'rxjs';
import { config } from 'process';
import { AccountService } from '../services/account.service';
import { ReloadService } from '../services/reload.service';
import { Route, Router } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { commentCreateModel } from '../model/commentCreateModel';
import { DetailPostComponent } from '../detail-post/detail-post.component';
import { file } from '../model/file';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],

})
export class PostComponent implements OnInit {
  postlist!: Postuser[]
  userlist!: User[]
  id!: number
  postuser: Postuser[] = []
  postuserdetail!: Postuser | undefined
  comment: CommentModel[] = []
  listimage: any[] = [];
  bodyComment!: string
  createComment!: commentCreateModel
  @ViewChild(DetailPostComponent) detailPostComponent!: DetailPostComponent;
  idcmtpost!: number
  pageNumber: number = 1;
  pageSize: number = 5;
  isLoading: boolean = false;

  constructor(private postService: PostService
    , private accountService: AccountService
    , private cdr: ChangeDetectorRef
    , private router: Router
    , private commentService: CommentService
  ) {
    this.loadData();
  }
  ngOnInit(): void {
    this.createComment = {
      id: '',
      userId: '',
    }

    this.CurrentImage(0, [], this.currentItem)
  }
  loadData() {
    this.isLoading=true
    this.postService.getPosts(this.pageNumber, this.pageSize).subscribe(res => {
      this.postuser = this.postuser.concat(res);
      this.isLoading = false;
      this.postuser.forEach(p=>{
        p.likes.forEach(l=>{
          if(l.userId==localStorage.getItem("userid")){
            p.isLike=l.isLike
          }
        })
      })
      console.log(this.postuser)
    })

  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight-100 && !this.isLoading) {
      this.pageNumber++;
      console.log("end")
      this.loadData();
    }
  }
  async GetUserPostById(id: number): Promise<void> {
    this.comment = []
    if (this.postuser.find(x => x.id === id) !== undefined) {
      this.postuserdetail = this.postuser.find(x => x.id === id);
      setTimeout(async () => {
        await this.commentService.getComments(id).subscribe((response: CommentModel[]) => {
          this.comment = response
          console.log(response)
          this.idcmtpost = id
      })
          }, 500);
    }
  }
  submitcomment() {
    this.createComment.body = this.bodyComment
    this.createComment.postId = this.idcmtpost
    this.createComment.userId = localStorage.getItem("userid")?.toString()
    this.createComment.upload = ''
    console.log(this.createComment)
     this.commentService.createComment(this.createComment).subscribe(res => {
      this.bodyComment = ""
    }
    )
    this.GetUserPostById(this.idcmtpost)
  }

  async GetUploadById(id: number) {

  }
  get remainingCount() {
    return this.listimage.length - 6;
  }
  async deletePost(id: number) {
    var userid = localStorage.getItem("userid");
    if (userid)
      await this.postService.deletePost(id, userid).subscribe((res) => {
        console.log(res)
        this.loadData();
        this.cdr.markForCheck();
      });
  }
  currentindex!: number
  currentlist!: file[]
  currentItem!: Postuser
  CurrentImage(index: number, li: file[], p: Postuser) {
    this.currentindex = index
    this.currentlist = li
    this.currentItem = p
    console.log(index)
  }
  like(posid:number,item:Postuser){
    var userid = localStorage.getItem("userid")!;
    if(item.isLike==true){
      item.isLike=false
      item.like--
    }
    else {
      item.isLike=true
      item.like++
    }

    this.postService.likepost(userid,posid).subscribe(()=>{
      
    });
  }
}

