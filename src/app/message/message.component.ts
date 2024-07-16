import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../model/user';
import Pusher from 'pusher-js';
import { ChatService } from '../services/chat.service';
import { message } from '../model/message';
import { messagehistory } from '../model/messagehistory';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  userlist!:User[]
  username:string="dung"
  mess!:string
  message!:message
  messages:message[]=[]
  lismess!:any[]
  currentuser:any
  currentboxchatuserid!:number
  currenthistorychat!:messagehistory[]
  currentboxchatid!:number
  id!:string
  checkuserbox!:boolean
  private pusher!: Pusher;
  private channel: any;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  constructor(private accountservice:AccountService,
    private chatservice:ChatService
  ) { }

  ngOnInit(): void {
    this.loadUser()
    Pusher.logToConsole = true;
    this.pusher = new Pusher('d02e9c74748fde4747c7', {
      cluster: 'ap1'
    });
    // var channel = pusher.subscribe(`chat_${this.currentboxchatid}`);
    // channel.bind('message',(data:message) =>{
    //   this.messages.push(data)
    //   console.log(this.messages)
    // });
    this.message={
      body:'',
      time:new Date,
      BoxChat_UserId:0
    }
  }

  loadUser(){
    this.accountservice.getUser().subscribe(res=>{
      this.userlist=res
    })
  }
  submit(){
    this.message.body=this.mess
    this.message.time=new Date()
    this.message.BoxChat_UserId=this.currentboxchatuserid
    console.log(this.message)
    this.chatservice.sendMessage(this.message).subscribe(()=>{
      this.mess=""
      this.scrollToBottom();
    })
  }
  changeMessage(event:any){
    this.mess = event.target.value
    this.scrollToBottom();
  }
  
  private scrollToBottom(): void {
    try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        console.log(this.chatContainer.nativeElement.scrollHeight)
      } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }
  selectbox(item:any){
    var userid=localStorage.getItem("userid")!
    this.currentuser=item
    if(item.id!=userid){
      this.chatservice.historyChat(item.id,userid).subscribe(boxchatid=>{
        if(boxchatid==0){
          this.chatservice.createBoxChat(userid).subscribe(async res=>{
            console.log(res.id)
            if(res.id){
              this.currentboxchatid=res.id
              await this.chatservice.addUser(userid, res.id).subscribe((res) => {
                this.mess=""
                console.log('User added to new box chat');
                this.currentboxchatuserid=res.id
                console.log(res.id)
              }, error => {
                console.error('Error adding user to new box chat:', error);
              });
             
                await this.chatservice.addUser(item.id, res.id).subscribe(() => {
                console.log('User added to new box chat');
                });
              
              
            } else {
              console.error('Error: newBox does not have an id property');
            }
            })
        } 
        else{
          if(item.id!=userid){
            this.mess=""
            this.id=localStorage.getItem("userid")!
            this.currentboxchatid=boxchatid
            this.messages=[]
            this.chatservice.findBoxChatUserId(userid,boxchatid).subscribe(res=>{
              this.currentboxchatuserid=res
              console.log(this.currentboxchatuserid)
             
            })
            this.chatservice.historyChatById(boxchatid).subscribe(res=>{
              console.log(res)
              this.currenthistorychat=res
            })
            setTimeout(() => {
               this.scrollToBottom();
            }, 500);
            this.subscribeToChannel(this.currentboxchatid);
          }
          else{
            this.currenthistorychat=[];
          }
          
        }  
      })
    }

             
  }
  subscribeToChannel(boxchatid: number) {
    if (this.channel) {
      this.channel.unbind('message'); // Unbind from previous channel
      this.pusher.unsubscribe(this.channel.name); // Unsubscribe from previous channel
    }
    this.channel = this.pusher.subscribe(`chat_${boxchatid}`); // Subscribe to new channel
    this.channel.bind('message', (data: message) => {
      
        this.messages.push(data);
        console.log(this.messages);
        this.scrollToBottom();
      
    });
  }
}
