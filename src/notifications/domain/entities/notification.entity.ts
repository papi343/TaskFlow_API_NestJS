





export class Notification{
    constructor(
     public readonly id:number|null,
        public message:string,
        public read:Boolean,
        public readonly userId:number,
        public readonly createdAt?:Date,
    ){}
}