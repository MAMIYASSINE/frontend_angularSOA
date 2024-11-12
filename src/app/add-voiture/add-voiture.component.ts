import { Component, OnInit } from '@angular/core';
import { Voiture } from '../model/voiture.model';
import { VoitureService } from '../services/voiture.service';
import { Marque } from '../model/marque.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.component.html'
})
export class AddVoitureComponent implements OnInit {

  marques!:Marque[];
  newIdMarque!:number;
  newMarque!:Marque;
  newVoiture=new Voiture();
  uploadedImage!: File; 
  imagePath: any;
  constructor(private voitureService: VoitureService,private router:Router) { }
  ngOnInit():void{
    this.voitureService.listeMarques().subscribe(marqs =>{
      console.log(marqs);
      this.marques=marqs._embedded.marques;
    });
  }

  /*addVoiture(){
    //this.newVoiture.marque=this.marques.find(marq =>marq.idMarque == this.newIdMarque)!;
    this.voitureService.uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => { 
      this.newVoiture.image=img; 
      this.newVoiture.marque=this.marques.find(marq =>marq.idMarque == this.newIdMarque)!;
      this.voitureService.ajouterVoiture(this.newVoiture).subscribe(()=>{
        this.router.navigate(['/']);
      });

  });
    
  }*/
  addVoiture(){ 
    this.newVoiture.marque = this.marques.find(marq =>marq.idMarque == this.newIdMarque)!; 
    this.voitureService
      .ajouterVoiture(this.newVoiture)
      .subscribe((voit) => { 
        this.voitureService 
          .uploadImageFS(this.uploadedImage, this.uploadedImage.name,voit.idVoiture) 
          .subscribe((response: any) => {} ); 
          this.router.navigate(['/']);
         });      
  }

    onImageUpload(event: any) { 
      this.uploadedImage = event.target.files[0]; 
      var reader = new FileReader(); 
      reader.readAsDataURL(this.uploadedImage); 
      reader.onload = (_event) => { this.imagePath = reader.result; } 
    }
  

}
