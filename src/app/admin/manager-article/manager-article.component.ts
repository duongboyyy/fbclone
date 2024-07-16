import { Component, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/model/commentModel';
import { Postuser } from 'src/app/model/postuser';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-manager-article',
  templateUrl: './manager-article.component.html',
  styleUrls: ['./manager-article.component.scss']
})
export class ManagerArticleComponent implements OnInit {
  list!:Postuser[]
  comment:CommentModel[]=[]
  detailpostuser!:Postuser
  pageNumber: number = 1;
  pageSize: number = 10;
  constructor(private postservice:PostService,
    private cmtservice:CommentService
  ) { }

  ngOnInit(): void {
    this.onload()
    
  }
  onload(){
    this.postservice.getPosts(this.pageNumber, this.pageSize).subscribe(res=>{
      this.list=res
      this.detailpostuser=res[0]
    })
  }
  async detailpost(item:Postuser){
     this.detailpostuser=item
     await this.cmtservice.getComments(item.id).subscribe(async res=>{
      this.comment=res
      await console.log(res)
     })
  }
  delete(id:number){
    this.postservice.deletePostAdmin(id).subscribe(()=>{
      this.onload()
    })
  }
}
