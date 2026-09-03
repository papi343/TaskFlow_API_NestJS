


export class User {
    constructor(
        public readonly id: number|null,
        public readonly nom: string,
        public readonly prenom: string,
        public readonly email: string,
        public readonly password: string,
        public readonly roleId: number
    ){}
}