import { Component, OnInit, inject } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';
import { User } from '../model/user';
import { Postuser } from '../model/postuser';
import { delay, forkJoin, mergeMap, switchMap } from 'rxjs';
import { config } from 'process';
import { Comment } from '../model/comment';
import { AccountService } from '../services/account.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postlist!: Post[]
  userlist!: User[]
  id!: number
  postuser: Postuser[] = []
  postuserdetail!: Postuser | undefined
  comment!: Comment[]
  constructor(private postService: PostService
    ,private accountService:AccountService) {

  }

  ngOnInit(): void {
    forkJoin({
      posts: this.postService.getPosts(),
    }).subscribe(({ posts, }) => {
      this.postlist = posts;
      setTimeout(() => {
        this.GetUserPost();
      }, 200);
      console.log(this.postlist)
    });
  }
  GetUserPost(): void {
    forkJoin(
      this.postlist.map(post =>
        this.accountService.getUserById(post.userId)
      )
    ).subscribe((users: User[]) => {
      console.log(users)
      users.forEach((user, index) => {
        const post = this.postlist[index];
        const p: Postuser = {
          username: user.firstName+" "+user.lastName,
          date: post.time,
          body: post.body,
          totallike: 0,
          comment: '',
          watch: 0,
          slug:post.slug,
          userId:post.userId
        };
        this.postuser.push(p);
        console.log(p)
      });

    });

  }
  GetUserPostById(slug:string): void {
    console.log(slug)
    this.comment = []
    if (this.postuser.find(x => x.slug === slug) !== undefined) {
      this.postuserdetail = this.postuser.find(x => x.slug === slug);
      //console.log(x.slug)
      setTimeout(() => {
            this.postService.getComment(1).subscribe((data: Comment[]) => {
        forkJoin(
          data.map(cmt =>

            this.postService.getUsersById(1)
          )
        ).subscribe((cmtuser: User[]) => {
          data.forEach((cmt, index) => {
            const user = cmtuser[index];
            if (Array.isArray(user) && user.length > 0)
              cmt.username = user[0].name;
          });
          this.comment = data
        })
      })
          }, 500);

      
    }

  }
  click(){
    console.log("click")
  }
}

