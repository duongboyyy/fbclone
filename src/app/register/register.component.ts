import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { register } from '../model/register';
import { Route, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user= new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password:new FormControl(''),
    confirmPassword:new FormControl('')
  });
  newacc!:register
  constructor(private router:Router, private accountServices:AccountService) { }

  ngOnInit(): void {
    this.newacc={
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  }
  async Register(){
    this.newacc=this.user.value
    console.log(this.newacc)
    await this.accountServices.Register(this.newacc).subscribe((response)=>{
      console.log(response)
    })
  }

}
