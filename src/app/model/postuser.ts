export interface Postuser {
  id: number
  userId: string,
  slug: string,
  username: string,
  time: Date,
  body: string,
  like: number,
  comment: string,
  watch: number,
  cmt: number,
  user: {
    id: string,
    firstName: string,
    lastName: string,
    address: string,
    avatar: string,
    coverImage: string,
    totalFriend: number,
    gender: true
  },
  uploads: [
    {
      id: string,
      postId: number,
      image: string,
      video: string
    }
  ],
  likes:[
    {
      id: string,
      postId: number,
      userId: string,
      isLike: boolean
    }
  ],
  isLike:boolean
}
