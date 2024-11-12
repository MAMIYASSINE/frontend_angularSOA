import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrl: './voitures.component.css'
})
export class VoituresComponent implements OnInit {
  voitures?: Voiture[];
  apiURL: string = 'http://localhost:8081/voitures/api';

  constructor( private voitureService :VoitureService,public authService: AuthService) {
    //this.voitures=voitureService.listeVoitures();
  }
  ngOnInit(): void {
    this.chargerVoitures();
    
  }
  /*chargerVoitures(){
    this.voitureService.listeVoitures().subscribe(voits =>{
      console.log(voits);
      this.voitures=voits;
      this.voitures.forEach((voit) => { 
        //this.voitureService.loadImage(voit.image.idImage).subscribe((img: Image) => { 
          voit.imageStr = 'data:' + voit.images[0].type + ';base64,' + voit.images[0].image; 
        //}); 
      });
    });
  }*/
  chargerVoitures(){
    this.voitureService.listeVoitures().subscribe(voits =>{
      this.voitures = voits;
      //console.log(this.apiURL+'/image/loadfromFS/'+voits[1].idVoiture); 
    });
  }

 
  supprimerVoiture(v: Voiture){
    //console.log(v);
    let conf = confirm("Etes-vous sûr ?");
     if (conf){

      this.voitureService.supprimerVoiture(v.idVoiture).subscribe(()=>{
      console.log("voiture supprimé");
      this.chargerVoitures();
    });
     }
  }
}
