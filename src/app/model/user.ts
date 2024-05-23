export interface User {
    id:number,
    name:string,
    username:string,
    email:string,
    address:{
        street:string,
        suite:string,
        city:string
    },
    phone:string,
    website:string,
}
