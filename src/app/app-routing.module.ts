import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoituresComponent } from './voitures/voitures.component';
import { AddVoitureComponent } from './add-voiture/add-voiture.component';
import { UpdateVoitureComponent } from './update-voiture/update-voiture.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';

const routes: Routes = [
  {path: "voitures",component:VoituresComponent},
  {path: "add-voiture",component:AddVoitureComponent},
  { path: "", redirectTo: "voitures", pathMatch: "full" },
  {path:"updateVoiture/:id",component:UpdateVoitureComponent},
  {path:"rechercheParMarque",component:RechercheParMarqueComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
