import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { VoitureService } from '../services/voiture.service';
import { Voiture } from '../model/voiture.model';
import { Marque } from '../model/marque.model';

@Component({
  selector: 'app-update-voiture',
  templateUrl: './update-voiture.component.html',
  styles: ``
})
export class UpdateVoitureComponent implements OnInit{

  marques!:Marque[];
  updatedMarqueId! : number;
  currentVoiture = new Voiture();
  constructor(private activatedRoute: ActivatedRoute,private router :Router,private voitureService :VoitureService){}
  ngOnInit():void {

    this.voitureService.listeMarques().subscribe(marqs =>{
      console.log(marqs);
      this.marques=marqs._embedded.marques;
      
    });
    this.voitureService.consulterVoiture(this.activatedRoute.snapshot.params['id']).subscribe(voit=>{
      this.currentVoiture=voit;
      this.updatedMarqueId=this.currentVoiture.marque.idMarque;
    });
    // console.log(this.route.snapshot.params.id);
    /*this.marques=this.voitureService.listeMarques();
    this.currentVoiture =this.voitureService.consulterVoiture(this.activatedRoute.snapshot.params['id']);
    this.updatedMarqueId=this.currentVoiture.marque.idMarque;*/
    //console.log(this.currentVoiture);
    
  }
  updateVoiture(){

    this.currentVoiture.marque=this.marques.find(marq =>marq.idMarque ==this.updatedMarqueId)!;
    this.voitureService.updateVoiture(this.currentVoiture).subscribe(voit =>{
      this.router.navigate(['voitures']);
    })
    /*this.currentVoiture.marque=this.voitureService.consulterMarque(this.updatedMarqueId);
    this.voitureService.updateVoiture(this.currentVoiture);
    this.router.navigate(['voitures']);*/
  }

}
