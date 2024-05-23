import { Component, OnInit, inject } from '@angular/core';
import { Post } from '../model/post';
import { PostService } from '../services/post.service';
import { User } from '../model/user';
import { Postuser } from '../model/postuser';
import { delay, forkJoin, mergeMap, switchMap } from 'rxjs';
import { config } from 'process';
import { Comment } from '../model/comment';



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
  constructor(private postService: PostService) {

  }

  ngOnInit(): void {
    forkJoin({
      posts: this.postService.getPosts(),
    }).subscribe(({ posts, }) => {
      this.postlist = posts;
      setTimeout(() => {
        this.GetUserPost();
      }, 200);

    });

  }
  GetUserPost(): void {
    forkJoin(
      this.postlist.map(post =>
        this.postService.getUsersById(post.userId)
      )
    ).subscribe((users: User[]) => {
      users.forEach((user, index) => {
        const post = this.postlist[index];

        if (Array.isArray(user) && user.length > 0) {
          const p: Postuser = {
            id: post.id,
            username: user[0].name,
            date: new Date(),
            title: post.title,
            body: post.body,
            totallike: 0,
            comment: '',
            watch: 0
          };

          this.postuser.push(p);
        }

      });

    });

  }
  GetUserPostById(id: number): void {
    this.comment = []
    if (this.postuser.find(x => x.id === id) !== undefined) {
      this.postuserdetail = this.postuser.find(x => x.id === id);
      setTimeout(() => {
            this.postService.getComment(id).subscribe((data: Comment[]) => {
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
