import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/model/login';
import { AccountService } from 'src/app/services/account.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {


  user = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  account!: login
  report!: string
  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.account = {
      email: "",
      password: ""
    }
  }
  async Login() {
    this.account = this.user.value
    await this.accountService.Login(this.account).subscribe((response) => {
      console.log(response)
      localStorage.setItem('token', response);
      
      if (response) {
        const decodedToken: any = jwtDecode(response);
        const role=decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        console.log(role)
        if(role=="Administrator"){
          this.router.navigateByUrl('admin/dashboard');
        }
        else{
          this.report="Tai khoan ko ton tai";
        }
      }
      
    })

  }
}
