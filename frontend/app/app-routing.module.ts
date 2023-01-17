import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminKnjigeComponent } from './admin-knjige/admin-knjige.component';
import { AdminKorisniciComponent } from './admin-korisnici/admin-korisnici.component';
import { AdminRegistracijaComponent } from './admin-registracija/admin-registracija.component';
import { AdminComponent } from './admin/admin.component';
import { CitalacMainComponent } from './citalac-main/citalac-main.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { KnjigaMainComponent } from './knjiga-main/knjiga-main.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './mainMenu/main.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { PregledZaduzenjaComponent } from './pregled-zaduzenja/pregled-zaduzenja.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { PromenaSifreComponent } from './promena-sifre/promena-sifre.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:"",component:FrontPageComponent, children:[
    {path:"",component:MainComponent}
  ]},
  {path:"login",component:LoginComponent, children:[
    {path:"",component:MainComponent}
  ]},
  {path:"register",component:RegisterComponent, children:[
    {path:"",component:MainComponent}
  ]},
  {path:'citalacMain',component:CitalacMainComponent, children:[
    {path:"",component:MainComponent}
  ]},
  {path:'promenaSifre',component:PromenaSifreComponent, children:[
    {path:"",component:MainComponent}
  ]},
  {path:"profil",component:ProfilComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"pregledZaduzenja",component:PregledZaduzenjaComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"istorijaZaduzenja",component:IstorijaZaduzenjaComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"pretraga",component:PretragaComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"knjigaMain",component:KnjigaMainComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"moderator",component:ModeratorComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"admin",component:AdminComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"dodajKnjigu",component:DodajKnjiguComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"adminLogin",component:LoginAdminComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"adminKnjiga",component:AdminKnjigeComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"adminKorisnik",component:AdminKorisniciComponent,children:[
    {path:"",component:MainComponent}
  ]},
  {path:"adminRegistracija",component:AdminRegistracijaComponent,children:[
    {path:"",component:MainComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
