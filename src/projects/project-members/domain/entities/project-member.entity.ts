


export class ProjectMember {
    constructor (
        public readonly id: number | null,
        public readonly projectId:number,
        public readonly userId: number,
        public readonly createdAt?:Date,
       
    ){}
}