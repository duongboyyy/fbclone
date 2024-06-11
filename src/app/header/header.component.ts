import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo!: User
  constructor(private accountService: AccountService) {
    this.accountService.getUserInfo().subscribe( data => {
      this.userInfo = data;
      localStorage.setItem("userid",this.userInfo.id);
      localStorage.setItem("userName",this.userInfo.lastName+" "+this.userInfo.firstName);
    },
    error => {
      console.error('Error fetching user info:', error);
    })
   }

  ngOnInit():  void {
    
    
  }
  logout(){
    this.accountService.logout();
  }
}
