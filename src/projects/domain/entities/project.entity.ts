


export class Project {
    constructor (
     public readonly id:number | null,
     public nom:string,
     public readonly ownerId:number,
     public readonly createdAt?:Date,
     public readonly updatedAt?:Date,
    ){

    }
}