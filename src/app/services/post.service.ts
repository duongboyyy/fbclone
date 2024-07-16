import { Injectable } from '@angular/core';
import { Post } from '../model/post';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, delay, take } from 'rxjs';
import { User } from '../model/user';
import { CommentModel } from '../model/commentModel';
import { file } from '../model/file';
import { Postuser } from '../model/postuser';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  url='https://jsonplaceholder.typicode.com'
  url2='https://localhost:44311/api/Posts'
  url3='https://localhost:44311/api/Upload'
  constructor(private http: HttpClient) { }

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(`${this.url}/posts`).pipe(delay(500));
  // }
  getPosts(pageNumber: number, pageSize: number): Observable<Postuser[]> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Postuser[]>(`${this.url2}`,{ params }).pipe(delay(500));
  }
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/users`)
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
  uploadImage(file:file): Observable<file>{
    return this.http.post<file>(`${this.url3}/Post`, file);
  }
  delUpload(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url3}/DelByIdPost/${id}`);
  }
  getUploadByPostId(id:number):Observable<file[]>{
    return this.http.get<file[]>(`${this.url3}/GetByIdPost/${id}`);
  }
  deletePost(id:number,userid:string):Observable<any>{
    return this.http.delete<any>(`${this.url2}/Delete/${id}`,{ params: { userid } });
  }
  deletePostAdmin(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url2}/Admin/Delete/${id}`);
  }
  updatePost(id:number, post:Post):Observable<Post>{
    return this.http.put<Post>(`${this.url2}/Put/${id}`,post);
  }
  likepost(userid:string, postid:number):Observable<string>{
    var body={userid,postid}
    return this.http.post<string>(`${this.url2}/Like`,body)
  }
}
