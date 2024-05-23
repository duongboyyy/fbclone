import { Component, Input, OnInit } from '@angular/core';
import { Postuser } from '../model/postuser';
import { PostService } from '../services/post.service';
import { Comment } from '../model/comment';
import { take } from 'rxjs';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss']
})
export class DetailPostComponent implements OnInit {
  @Input() detailpost!:Postuser
  @Input() cmtpost!:Comment[]
  constructor(private postService: PostService) {
   
  }

  ngOnInit(): void {
     
  }
  
}
