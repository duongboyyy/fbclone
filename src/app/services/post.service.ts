import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import {HttpClient} from '@angular/common/http'
import { Observable, delay, take } from 'rxjs';
import { User } from '../model/user';
import { Comment } from '../model/comment';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  url='https://jsonplaceholder.typicode.com'
  
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`).pipe(delay(500));
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users`)
  }
  getComment(id:number):Observable<Comment[]>{
    return this.http.get<Comment[]>(`${this.url}/comments?postId=${id}`)
  }
  getUsersById(id:number):Observable<User>{
    return this.http.get<User>(`${this.url}/users?id=${id}`).pipe(delay(500))
  } 
}
