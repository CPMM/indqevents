export class Evento {
    constructor(
        public id:string,
        public title:string,
        public description:string,
        public date:string,
        public image:string,
        public attendances:number,
        public willYouAttend:boolean ,
        public location:Array<number>
    ) {}
}
