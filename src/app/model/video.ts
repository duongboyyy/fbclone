export interface video {
    id:string,
    title:string,
    url:string,
    userId:string,
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
}