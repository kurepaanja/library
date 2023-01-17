import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { KnjigaService } from '../knjiga.service';
import { GlobalDB } from '../model/global';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zaduzenje } from '../model/zaduzenje';
import { ZaduzenjeService } from '../zaduzenje.service';
import { ZaduzenjeKnjiga } from '../model/ZaduzenjeKnjiga';
import { Rezervacija } from '../model/rezervacija';

@Component({
  selector: 'app-pregled-zaduzenja',
  templateUrl: './pregled-zaduzenja.component.html',
  styleUrls: ['./pregled-zaduzenja.component.css']
})
export class PregledZaduzenjaComponent implements OnInit {

  constructor(private zaduzenjaServis: ZaduzenjeService, private knjigaServis: KnjigaService, private router: Router, private globalServis: GlobalService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.mojaZaduzenja = [];
    this.imaZaduzenja = false;
    this.mojeKnjige = [];
    this.lista = [];

    this.globalServis.getDaysReturn().subscribe((globalDB: GlobalDB) => {
      this.rok = globalDB[0].daysReturn;
      //console.log(this.rok)

      this.zaduzenjaServis.nadjiZaduzenje(this.korisnik.korisnickoIme).subscribe((data: Zaduzenje[]) => {
        if (data.length > 0) {
          console.log(data)
          let i = 0;
          for (let index = 0; index < data.length; index++) {
            if (data[index].datumVracanja == "") {
              this.mojaZaduzenja[i] = data[index];
              this.imaZaduzenja = true;
              i++;
            }

          }

          //UZMI KNJIGE
          for (let index = 0; index < this.mojaZaduzenja.length; index++) {
            this.knjigaServis.uzmiKnjigu(this.mojaZaduzenja[index].idKnjiga).subscribe((knjigaDB: Knjiga) => {
              this.mojeKnjige[index] = knjigaDB;
              this.lista[index] = new ZaduzenjeKnjiga;
              this.lista[index].naziv = this.mojeKnjige[index].naziv;
              this.lista[index].slika = this.mojeKnjige[index].slika;
              this.lista[index].idKnjiga = knjigaDB.id;
              this.lista[index].korisnickoIme = this.mojaZaduzenja[index].korisnickoIme;
              this.lista[index].produzenje = this.mojaZaduzenja[index].produzenje;
              console.log(this.mojaZaduzenja[index].produzenje)
              console.log(this.lista[index].produzenje)
              this.lista[index].autor = []
              for (let k = 0; k < knjigaDB.autor.length; k++) {
                this.lista[index].autor[k] = knjigaDB.autor[k];
              }
              console.log(this.lista)
              let now = new Date();
              let uzimanje = new Date(this.mojaZaduzenja[index].datumZaduzenja);
              console.log(uzimanje)
              var razlikaVreme = now.getTime() - uzimanje.getTime();
              var razlikaDani = razlikaVreme / (1000 * 3600 * 24);
              let prod = 0;

              if (this.mojaZaduzenja[index].produzenje > 0) {
                prod = this.rok;
              }

              if (razlikaDani < (this.rok + prod)) {
                //nisu dani prosli
                this.lista[index].rokVracanja = Math.round(this.rok - razlikaDani + prod);
                this.lista[index].kasni = false;

              } else {
                //prosli dani
                this.lista[index].rokVracanja = Math.round(razlikaDani - this.rok);
                this.lista[index].kasni = true;
              }


            })

          }


        }

      })


    })





    console.log(this.lista)
    console.log(this.mojeKnjige)


  }

  korisnik: Korisnik;
  mojaZaduzenja: Zaduzenje[];
  imaZaduzenja: boolean;
  mojeKnjige: Knjiga[];
  rok: number;
  lista: ZaduzenjeKnjiga[];
  daljeKnjiga: Knjiga;

  routeKnjiga(id) {
    this.knjigaServis.uzmiKnjigu(id).subscribe((data: Knjiga) => {
      this.daljeKnjiga = data;
      localStorage.setItem("knjiga", JSON.stringify(this.daljeKnjiga));
      this.router.navigate(['knjigaMain']);
    })
  }


  produzi(idKnjiga) {
    this.zaduzenjaServis.produzi(this.korisnik.korisnickoIme, idKnjiga, this.rok).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.ngOnInit();
      }
    })
  }


  izracunajRazlikuVremena(datumZaduzenja) {
    let now = new Date();
    let zaduzenje = new Date(datumZaduzenja)
    return ((now.getTime() - zaduzenje.getTime()) / (1000 * 3600 * 24))
  }


  listaTudjihZaduzenja: Zaduzenje[];


  vratiKnjigu(idKnjiga, korisnickoIme) {
    let now = new Date()

    let [month, day, year] = now.toLocaleDateString().split("/");
    let st = ""
    if (Number(month) < 10) {
      st = st + year + "-" + "0" + month;
    } else {
      st = st + year + "-" + month
    }
    if (Number(day) < 10) {
      st = st + "-" + "0" + day;
    } else {
      st = st + "-" + day;
    }

    this.imaKorisnika = false;
    this.rezKorisnik = ''
    let brojKor=1;

    this.zaduzenjaServis.zavrsiZaduzenje(idKnjiga, korisnickoIme, st).subscribe((resp) => {
      if (resp['message'] == 'ok') {
        this.knjigaServis.dohvatiRezervaciju(idKnjiga).subscribe((rezervacijaDB: Rezervacija) => {
          if (rezervacijaDB.korisnici.length > 0) {
            //ima ih
            for (let i = 0; i < rezervacijaDB.korisnici.length; i++) {
              
              this.zaduzenjaServis.nadjiTrenutnaZaduzenja(rezervacijaDB.korisnici[i]).subscribe((zaduzenjaDB: Zaduzenje[]) => {
                brojKor++;
                if (zaduzenjaDB.length < 3) {
                  //prvi uslov ispunjen
                  //gledamo dal je neko zaduzenje zakasnelo
                  if (this.proveraKasnjeja(zaduzenjaDB)) {
                    console.log(rezervacijaDB.korisnici[i] + "NIJEDNA KNJGIA NE KASNI")
                    if (!this.imaKorisnika) {
                      this.rezKorisnik = rezervacijaDB.korisnici[i];
                      this.imaKorisnika = true;
                      this.knjigaServis.izbrisiKorisnika(idKnjiga, rezervacijaDB.korisnici[i]).subscribe(resp => {
                        console.log(rezervacijaDB.korisnici[i] + " dobio rezervaciju")
                        //dodaj zaduzenje
                        let datum = this.formirajDatum()
                        this.zaduzenjaServis.novoZaduzenje(idKnjiga, rezervacijaDB.korisnici[i], datum, 1).subscribe(resp => {
                          if (resp['message'] == 'ok') {
                            this.ngOnInit()
                          }
                        })
                      })
                    }
                    if(!this.imaKorisnika && brojKor==rezervacijaDB.korisnici.length){
                      console.log("INC KNJIGA")
                    }

                  }else{
                    if(!this.imaKorisnika && brojKor==rezervacijaDB.korisnici.length){
                      console.log("INC KNJIGA")
                    }
                  }
                  


                } else {
                  if(!this.imaKorisnika && brojKor==rezervacijaDB.korisnici.length){
                    console.log("INC KNJIGA")
                  }
                }
                console.log(this.imaKorisnika + this.rezKorisnik)

              })



            }
            if (!this.imaKorisnika && brojKor == rezervacijaDB.korisnici.length) {
              console.log("NEMA KORISNIKA")
              this.knjigaServis.incBrojKnjiga(idKnjiga).subscribe((resp) => {
                this.ngOnInit()
              })
            }
            //IF NEMA KORISNIKA ZA RAZERVISANJE ISTO INCREMENT


          } else {
            //samo INCREMENT BROJA KNJIGA
            this.knjigaServis.incBrojKnjiga(idKnjiga).subscribe((resp) => {
              this.ngOnInit()
            })
          }
        })

      }
    })

  }

  imaKorisnika: boolean;
  rezKorisnik: string;


  //test za rezervaciju
  test(idKnjiga, korisnickoIme) {
    this.imaKorisnika = false;
    this.rezKorisnik = ''
    let brojKor=0;
    this.knjigaServis.dohvatiRezervaciju(idKnjiga).subscribe((rezervacijaDB: Rezervacija) => {
      if (rezervacijaDB.korisnici.length > 0) {
        //ima ih
        for (let i = 0; i < rezervacijaDB.korisnici.length; i++) {
         
          console.log(rezervacijaDB.korisnici.length)
          console.log(brojKor)
          this.zaduzenjaServis.nadjiTrenutnaZaduzenja(rezervacijaDB.korisnici[i]).subscribe((zaduzenjaDB: Zaduzenje[]) => {
            brojKor++
            if (zaduzenjaDB.length < 3) {
              //prvi uslov ispunjen
              //gledamo dal je neko zaduzenje zakasnelo
              if (this.proveraKasnjeja(zaduzenjaDB)) {
                
                if (!this.imaKorisnika) {
                  this.rezKorisnik = rezervacijaDB.korisnici[i];
                  this.imaKorisnika = true;
                  console.log(rezervacijaDB.korisnici[i] + "DOBIJA")
                }
                if(!this.imaKorisnika && brojKor==rezervacijaDB.korisnici.length){
                  console.log("INC KNJIGA")
                }

              }if(!this.imaKorisnika && brojKor==rezervacijaDB.korisnici.length){
                console.log("INC KNJIGA")
              }


            } else {
              if(!this.imaKorisnika && brojKor==rezervacijaDB.korisnici.length){
                console.log("INC KNJIGA")
              }
              console.log(rezervacijaDB.korisnici[i] + "IMA TRI KNJIGE")
            }
            console.log(this.imaKorisnika + this.rezKorisnik)

          })



        }
        

      }
    })

  }

  //vraca tacno ako kasni
  proveraKasnjeja(datumZaduzenjaLista) {
    let sviDobri = true;
    for (let i = 0; i < datumZaduzenjaLista.length; i++) {
      var razlikaVreme = this.izracunajRazlikuVremena(datumZaduzenjaLista[i].datumZaduzenja);
      let prod = 0;
      if (datumZaduzenjaLista[i].produzenje > 0) {
        prod = this.rok;
      }
      if (razlikaVreme > this.rok + prod) sviDobri = false;
    }
    return sviDobri

  }


  formirajDatum() {
    let now = new Date()

    let [month, day, year] = now.toLocaleDateString().split("/");
    let st = ""
    if (Number(month) < 10) {
      st = st + year + "-" + "0" + month;
    } else {
      st = st + year + "-" + month
    }
    if (Number(day) < 10) {
      st = st + "-" + "0" + day;
    } else {
      st = st + "-" + day;
    }

    return st;
  }




}
