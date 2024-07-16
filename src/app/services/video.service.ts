import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { video } from '../model/video';
import { delay } from 'lodash';
import { videoModel } from '../model/videoModel';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  url='https://localhost:44311/api/Video'
  constructor(private http: HttpClient) { }
  getAll(): Observable<video[]>{
    return this.http.get<video[]>(`${this.url}`);
  }
  postVideo(file:videoModel): Observable<videoModel>{
    return this.http.post<videoModel>(`${this.url}/Post`, file);
  }
}
