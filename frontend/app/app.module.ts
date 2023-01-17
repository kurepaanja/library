import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './mainMenu/main.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { CitalacMainComponent } from './citalac-main/citalac-main.component';
import { PromenaSifreComponent } from './promena-sifre/promena-sifre.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { PregledZaduzenjaComponent } from './pregled-zaduzenja/pregled-zaduzenja.component';
import { IstorijaZaduzenjaComponent } from './istorija-zaduzenja/istorija-zaduzenja.component';
import { KnjigaMainComponent } from './knjiga-main/knjiga-main.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { AdminComponent } from './admin/admin.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdminRegistracijaComponent } from './admin-registracija/admin-registracija.component';
import { AdminKorisniciComponent } from './admin-korisnici/admin-korisnici.component';
import { AdminKnjigeComponent } from './admin-knjige/admin-knjige.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    FrontPageComponent,
    CitalacMainComponent,
    PromenaSifreComponent,
    PretragaComponent,
    ProfilComponent,
    PregledZaduzenjaComponent,
    IstorijaZaduzenjaComponent,
    KnjigaMainComponent,
    ModeratorComponent,
    AdminComponent,
    DodajKnjiguComponent,
    LoginAdminComponent,
    AdminRegistracijaComponent,
    AdminKorisniciComponent,
    AdminKnjigeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //NoopAnimationsModule,
    MatSelectModule,
    NgChartsModule,
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
