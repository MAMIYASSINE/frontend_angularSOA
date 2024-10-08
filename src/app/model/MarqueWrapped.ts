import { Marque } from "./marque.model";
export class MarqueWrapped{
    _embedded!: {marques:Marque[]}
}