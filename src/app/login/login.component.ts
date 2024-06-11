import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { login } from '../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user= new FormGroup({
    email: new FormControl(''),
    password:new FormControl('')
  });
  account!:login
  report!:string
  constructor(private router: Router,private accountService: AccountService) { }

  ngOnInit(): void {
    this.account= {
      email:"",
      password:""
    }
  }
  async Login(){
    this.account=this.user.value
    await this.accountService.Login(this.account).subscribe((response)=>{
      
      console.log(response)
      localStorage.setItem('token', response);
      this.router.navigateByUrl('/');
      
      //this.isAuthenticated = true;
    })
    
    console.log(this.account);
  }
}
