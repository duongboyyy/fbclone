import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Postuser } from '../model/postuser';
import { PostService } from '../services/post.service';
import { CommentModel } from '../model/commentModel';
import { take } from 'rxjs';
import { PostComponent } from '../post/post.component';
import { file } from '../model/file';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPostComponent implements OnInit {
  @Input() detailpost!:Postuser
  @Input() cmtpost!:CommentModel[]
  @ViewChild(PostComponent) postComponent!: PostComponent
  @Output() index = new EventEmitter<number>();
  constructor(private postService: PostService,private cdr: ChangeDetectorRef) {
    
  }
  ngOnInit(): void {
     
    // this.currentItem = {
    //   id: 0,
    //   username: '',
    //   time: new Date,
    //   body: '',
    //   totallike: 0,
    //   comment: '',
    //   watch: 0,
    //   slug: '',
    //   userId:'',
    //   uploads:[],

    // };
    
    this.CurrentImage(0,[],this.currentItem)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cmtpost'] && !changes['cmtpost'].isFirstChange()) {
      this.cdr.markForCheck();
    }
  }
  get remainingCount() {
    return this.detailpost.uploads.length - 6;
  }

  currentindex!:number
  currentlist!:file[]
  currentItem!:Postuser
  async CurrentImage(index:number,li:file[],p:Postuser){
    this.currentindex=index
    this.currentlist=li
    this.currentItem=p
    this.index.emit(index);
    console.log(index)
  }
}
