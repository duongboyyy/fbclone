import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { CommentModel } from '../model/commentModel';
import { commentCreateModel } from '../model/commentCreateModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url='https://localhost:44311/api/Comment'
  constructor(private http: HttpClient) { }
  getComments(id:number): Observable<CommentModel[]> {
    return this.http.get<CommentModel[]>(`${this.url}/GetByPostId/${id}`).pipe(delay(500));
  }
  createComment(cmt:commentCreateModel): Observable<commentCreateModel>{
    return this.http.post<commentCreateModel>(`${this.url}/Create`, cmt);
  }
}
