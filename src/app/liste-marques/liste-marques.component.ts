import { Component, OnInit } from '@angular/core';
import { Marque } from '../model/marque.model';
import { VoitureService } from '../services/voiture.service';

@Component({
  selector: 'app-liste-marques',
  templateUrl: './liste-marques.component.html',
  styles: ``
})
export class ListeMarquesComponent implements OnInit{

  marques!:Marque[];
  updatedMarque:Marque = {
    "idMarque": 0, "nomMarque": "",
    descriptionMarque: ''
  };
  ajout:boolean=true;
  constructor(private voitureService:VoitureService){}
  ngOnInit(): void {
    this.chargerMarques();
    
  }
  chargerMarques(){

    this.voitureService.listeMarques().subscribe(marqs=>{
      this.marques=marqs._embedded.marques;
      console.log(marqs);
    })
  }
  updateMarq(marq:Marque){
    this.updatedMarque=marq;
    this.ajout=false;
  }
  marqueUpdated(marq:Marque){ 
    console.log("Marque updated event",marq); 
    this.voitureService.ajouterMarque(marq). subscribe( ()=> this.chargerMarques()); 
  }
  supprimerMarq(marq:Marque){
    let conf = confirm("Etes-vous sûr ?");
    if (conf){
      this.voitureService.supprimerMarque(marq.idMarque).subscribe(()=>{
        console.log("Marque Supprimée");
        this.chargerMarques();
      });
    }
  }
}
