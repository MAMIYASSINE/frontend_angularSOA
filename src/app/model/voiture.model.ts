import { Marque } from "./marque.model";
export class Voiture{
    idVoiture!: number;
    nomVoiture!:string;
    nbPortes!:number;
    puissance!:number;
    type!:string;
    prixVoiture!:number;
    dateCreationVoiture!:Date;
    marque! : Marque;
}