import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../model/user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!:User
  image!:any
  imagePreviews!:any
  constructor(private accountservice:AccountService) { }

  ngOnInit(): void {
    this.loaddata()
  
  }
  loaddata(){
    this.accountservice.getUserInfo().subscribe((res:User)=>{
      this.user=res
      console.log(this.user)
    })
  }
  onFileSelected(event: any): void {
    console.log(event)
    const files = event.target.files;
    this.image= event.target.files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews=e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  // async saveImage(id:number){
  //   if(this.imageList){
  //     for(let item of this.imageList){
  //       const nameImg = this.getCurrentDateTime() + item.name;
  //       const fileRef = this.storage.ref(nameImg);
  //       this.storage.upload(nameImg, item).snapshotChanges().pipe(
  //         finalize(() => {
  //           fileRef.getDownloadURL().subscribe(async (url) => {
  //             this.file.id="2d6ffb14-b819-4319-ae39-3e6e4be5bf37";
  //             this.file.postId=id;
  //             this.file.image=url;
  //             this.file.video="";
  //             await this.postService.uploadImage(this.file).subscribe(async res=>{
  //               await console.log(res)
  //             });
  //           });
  //         })
  //       ).subscribe();
  //     }
  //   }
  // }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  removeImagePreview(){
    this.image=""
    this.imagePreviews=""
    console.log("lcik");
  }
}
