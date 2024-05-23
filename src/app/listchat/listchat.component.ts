import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { User } from '../model/user';

@Component({
  selector: 'app-listchat',
  templateUrl: './listchat.component.html',
  styleUrls: ['./listchat.component.scss']
})
export class ListchatComponent implements OnInit {

  user!:User[]

  constructor(private postservice: PostService) { }

  ngOnInit(): void {
    this.postservice.getUsers().subscribe((item:User[])=>{
      this.user=item
      
    })
  }

}
