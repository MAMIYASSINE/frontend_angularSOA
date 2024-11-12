import { Marque } from "./marque.model";
import { Image } from "./image.model";

export class Voiture{
    idVoiture!: number;
    nomVoiture!:string;
    nbPortes!:number;
    puissance!:number;
    type!:string;
    prixVoiture!:number;
    dateCreationVoiture!:Date;
    marque! : Marque;
    image! : Image ;
    imageStr!:string;

    images!: Image[];
}