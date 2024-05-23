import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user= new FormGroup({
    username: new FormControl(''),
      password:new FormControl('')
  });
  report!:string
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  Login(){
    if(this.user.value.username===this.user.value.password)
      this.router.navigate([""]);
    else{
      this.report="dang nhap ko thanh cong";
    }
    console.log(this.user.value);
  }
}
