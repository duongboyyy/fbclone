import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { User } from '../model/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-listchat',
  templateUrl: './listchat.component.html',
  styleUrls: ['./listchat.component.scss']
})
export class ListchatComponent implements OnInit {

  user!:User[]

  constructor(private postservice: PostService,
    private accountservice: AccountService
  ) { }

  ngOnInit(): void {
    this.accountservice.getUser().subscribe((item:User[])=>{
      this.user=item
      
    })
  }

}
