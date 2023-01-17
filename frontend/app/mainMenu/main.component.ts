import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  //DODAJ PROVERA DAL JE NEKO RIEGISTROVAN AKO JESTE JEDAN DIV GDE MU SLIAK IZLAZI
  ngOnInit(): void {
    this.hasImage = false;
    this.ulogovan = false;
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    //this.tip=1;


    if (this.korisnik != null) {
      if (Number(this.korisnik.tip) == 1) this.tip = 1;
      if (Number(this.korisnik.tip) == 2) this.tip = 2;
      if (Number(this.korisnik.tip) == 3) this.tip = 3;
      if (Number(this.korisnik.tip) == 5) this.tip = 5;
      if (this.korisnik.slika != "") {
        this.hasImage = true;
      } else {
        console.log(this.korisnik.slika);
        this.hasImage = false;
      }
      this.ulogovan = true;
    }
  }

  hasImage: boolean;
  ulogovan: boolean;
  korisnik: Korisnik
  tip: number; // 1 citalac ,2 moderator, 3 admin

  profil() {
    this.router.navigate(["profil"]);
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate([""]);
  }

}
