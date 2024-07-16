import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userName:any
  constructor(private accountService:AccountService) {

  }
  ngOnInit(): void {
     this.accountService.getUserInfo().subscribe(res=>{
      this.userName=res.lastName+" "+res.firstName
     })
  }
}
