import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, delay, take } from 'rxjs';
import { User } from '../model/user';
import { Comment } from '../model/comment';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  url='https://jsonplaceholder.typicode.com'
  url2='https://localhost:44311/api/Posts'
  constructor(private http: HttpClient) { }

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(`${this.url}/posts`).pipe(delay(500));
  // }
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url2}`).pipe(delay(500));
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

  createPost(newpost:Post): Observable<Post>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.post<Post>(`${this.url2}/Create`, newpost,{ headers: headers });
  }
}
