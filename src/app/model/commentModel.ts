export interface CommentModel
 {
    id?:string,
    postId?:number,
    userId:string,
    time?:Date,
    timeSincePosted:string,
    upload?:string,
    body?:string,
    user?:{
        id:string,
        firstName:string,
        lastName:string,
        address:string,
        avatar:string,
        coverImage:string,
        totalFriend:0,
        gender:boolean
    }
}
