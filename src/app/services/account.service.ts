import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { login } from '../model/login';
import { register } from '../model/register';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url='https://localhost:44311/api/Account'
  constructor(private http: HttpClient) { }

  Login(account:login): Observable<string>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/SignIn`, account,{ headers: headers, responseType: 'text' });
  }
  Register(account:register):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.url}/SignUp`, account,{ headers: headers });
  }
  isLoggedIn(): boolean {
    // Kiểm tra trạng thái đăng nhập của người dùng
    return !!localStorage.getItem('token');  // Hoặc cách kiểm tra khác tùy vào logic của bạn
  }
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
  }
  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.url}/Info`, { headers });
  }
  getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${this.url}/GetUserById/${id}`).pipe(delay(500))
  }
}
