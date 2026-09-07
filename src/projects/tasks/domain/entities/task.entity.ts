



export class Task {
    constructor(
        public readonly id: number|null,
        public readonly titre: string,
        public  complete: Boolean,
        public readonly projectId:number,

    ){}
}