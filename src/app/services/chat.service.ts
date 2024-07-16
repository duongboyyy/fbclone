import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { message } from '../model/message';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = 'https://localhost:44311/api/Chat'
  constructor(private http: HttpClient) { }

  sendMessage(body: message): Observable<any> {
    return this.http.post<any>(`${this.url}/Message`, body)
  }
  createBoxChat(userid:string): Observable<any> {
    return this.http.post<any>(`${this.url}/CreateBox`, {userid}).pipe(delay(1000))
  }
  addUser(userid: string, boxchatid: number): Observable<any> {
    return this.http.post<any>(`${this.url}/AddUser`,  { userid, boxchatid } ).pipe(delay(1000))
  }
  historyChat(userid1: string, userid2: string): Observable<any> {
    return this.http.get<any>(`${this.url}/History2`, { params: { userid1, userid2 } })
  }
  historyChatById(id:number): Observable<any> {
    return this.http.get<any>(`${this.url}/History`, { params: { id } })
  }
  findBoxChatUserId(userid: string, boxid: number):Observable<any>{
    return this.http.get<any>(`${this.url}/BoxChatUserId`, { params: { userid, boxid } })
  }
}
