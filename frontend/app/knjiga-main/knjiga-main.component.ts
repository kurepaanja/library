import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { KnjigaService } from '../knjiga.service';
import { GlobalDB } from '../model/global';
import { Knjiga } from '../model/knjiga';

import { Komentar } from '../model/komentar';
import { Korisnik } from '../model/korisnik';
import { Rezervacija } from '../model/rezervacija';
import { Zaduzenje } from '../model/zaduzenje';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-knjiga-main',
  templateUrl: './knjiga-main.component.html',
  styleUrls: ['./knjiga-main.component.css']
})
export class KnjigaMainComponent implements OnInit {

  constructor(private knjigaServis: KnjigaService, private zaduzenjeServis: ZaduzenjeService, private globalServis: GlobalService) { }

  ngOnInit(): void {
    this.knjiga = JSON.parse(localStorage.getItem('knjiga'));
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.sviKomentari = [];
    this.korisnikTekucaZaduzenja = [];
    this.imaKomentara = false;
    this.nevracenaKnjiga = false;
    this.vecImaKnjigu = false;
    this.vecImaKomentar = false;
    this.moderator = false;
    this.upAutor = false;
    this.upBrojKnjiga = false;
    this.upIzdavac = false;
    this.upJezik = false;
    this.upNaziv = false;
    this.upSlika = false;
    this.upZanr = false;
    this.upGodina = false;
    this.upKomentar = []
    this.vecImaKnjiguZaKomentar = false;

    if (this.korisnik != null) {
      if (this.korisnik.tip == '2') {
        this.moderator = true;
      }
    }

    console.log(this.knjiga.brojKnjiga)

    // this.knjigaServis.uzmiKnjigu(this.knjigaLC.id).subscribe((data:Knjiga)=>{
    //   this.knjiga=data;

    // })



    this.globalServis.getDaysReturn().subscribe((data: GlobalDB[]) => {
      //console.log(data)
      this.rok = data[0].daysReturn;
      //console.log(this.rok)
    })


    this.knjigaServis.sviKomentariZaKnjigu(this.knjiga.id).subscribe((data: Komentar[]) => {
      let sum = 0;
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.upKomentar[i] = false;
          if (this.korisnik.korisnickoIme == data[i].korisnickoIme) {
            this.vecImaKomentar = true;
          }
          sum += data[i].ocena;
          this.sviKomentari[i] = data[i];
        }
        this.prosecnaOcena = sum / data.length
        this.imaKomentara = true;
      } else {
        this.prosecnaOcena = 0;
      }
      //console.log(this.sviKomentari);
      //console.log(this.prosecnaOcena);
    })

    this.zaduzenjeServis.nadjiZaduzenje(this.korisnik.korisnickoIme).subscribe((data: Zaduzenje[]) => {
      console.log(data);
      let i = 0;
      for (let index = 0; index < data.length; index++) {
        if (data[index].idKnjiga == this.knjiga.id) {
          this.vecImaKnjiguZaKomentar = true;
        }
        if (data[index].datumVracanja == "") {

          //vec ima knjigu
          if (data[index].idKnjiga == this.knjiga.id) {
            this.vecImaKnjigu = true;
          }

          this.korisnikTekucaZaduzenja[i] = data[index];
          let now = new Date();
          let uzimanje = new Date(data[index].datumZaduzenja);
          var razlikaVreme = now.getTime() - uzimanje.getTime();
          var razlikaDani = razlikaVreme / (1000 * 3600 * 24);
          //console.log(razlikaDani);

          //napraviti global bazu gde mogu da se menjaju DANI kad treba da vratis
          if (razlikaDani > this.rok) {
            this.nevracenaKnjiga = true;
          }
          i++
        }

      }
      //console.log(this.korisnikTekucaZaduzenja)
    })

  }


  knjigaLC: Knjiga;
  korisnikTekucaZaduzenja: Zaduzenje[];
  korisnik: Korisnik;
  knjiga: Knjiga;
  sviKomentari: Komentar[];
  prosecnaOcena: number;
  imaKomentara: boolean;
  tekstNovogKomentara: string;
  ocenaNovogKomentara: number;
  message: string;
  nevracenaKnjiga: boolean; //dok uzimamo zaduzenja iz backenda proveravamo dal je nekom proso rok
  rok: number;
  vecImaKnjigu: boolean;
  vecImaKnjiguZaKomentar: boolean;
  vecImaKomentar: boolean;



  broj() {

    if (Number(this.knjiga.brojKnjiga) > 0) return true;
    return false;
  }

  rezervisi() {
    this.knjigaServis.dohvatiRezervaciju(this.knjiga.id).subscribe((data: Rezervacija) => {
      console.log(data.korisnici)
      if (!this.korisnikImeRezervaciju(data.korisnici)) {
        this.knjigaServis.dodajRezervaciju(this.knjiga.id, this.korisnik.korisnickoIme).subscribe((resp) => {
          if (resp['message'] == 'ok') {
            alert("Knjiga rezervisana")
            this.ngOnInit;
          }
        })
      } else {
        alert("Vec ste rezervisali datu knjigu")
      }

    })

  }

  korisnikImeRezervaciju(korisnici) {
    for (let index = 0; index < korisnici.length; index++) {
      if (korisnici[index] == this.korisnik.korisnickoIme) return true
    }
    return false;

  }





  //AZURIRANJE STRANICE
  moderator: boolean;
  upNaziv: boolean;
  upAutor: boolean;
  upZanr: boolean;
  upIzdavac: boolean;
  upGodina: boolean
  upJezik: boolean;
  upBrojKnjiga: boolean;
  upSlika: boolean;

  novTekst: string;


  promeniNaziv() {

    this.upNaziv = true;

  }

  promeniAutor() {
    this.upAutor = true;
  }

  promeniZanr() {
    this.upZanr = true;
  }

  promeniIzdavac() {
    this.upIzdavac = true;
  }

  promeniGodina() {
    this.upGodina = true
  }

  promeniJezik() {
    this.upJezik = true;
  }

  promeniBrojKnjiga() {
    this.upBrojKnjiga = true;
  }

  promeniSlika() {
    this.upSlika = true;
  }



  updateNaziv() {
    this.knjigaServis.promeniNaziv(this.knjiga.id, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.upNaziv = false;
        this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
          localStorage.setItem("knjiga", JSON.stringify(data));
          //console.log(data.brojKnjiga)
          this.ngOnInit();
        })
      }
    })

  }

  updateAutor() {
    let autor = this.novTekst.split(",")
    this.knjigaServis.promeniAutor(this.knjiga.id, autor).subscribe(resp => {
      this.upAutor = false;
      this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)
        this.ngOnInit();
      })
    })

  }

  updateZanr() {
    let zanr = this.novTekst.split('zanr')
    this.knjigaServis.promeniZanr(this.knjiga.id, zanr).subscribe(resp => {
      this.upZanr = false;
      this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)
        this.ngOnInit();
      })
    })

  }

  updateIzdavac() {
    this.knjigaServis.promeniIzdavac(this.knjiga.id, this.novTekst).subscribe(resp => {
      this.upIzdavac = false;
      this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)
        this.ngOnInit();
      })
    })

  }

  updateGodina() {
    this.knjigaServis.promeniGodina(this.knjiga.id, this.novTekst).subscribe(resp => {
      this.upGodina = false;
      this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)
        this.ngOnInit();
      })

    })

  }

  updateJezik() {
    this.knjigaServis.promeniJezik(this.knjiga.id, this.novTekst).subscribe(resp => {
      this.upJezik = false;
      this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)
        this.ngOnInit();
      })
    })

  }

  imaKorisnika:boolean;

  updateBrojKnjiga() {
    this.imaKorisnika=false;
    let brojDodatihKnjiga=Number(this.novTekst)
    this.upBrojKnjiga = false;

    this.knjigaServis.promeniBrojKnjiga(this.knjiga.id, this.novTekst).subscribe(resp => {
      this.upBrojKnjiga = false;
      this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {


        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)

        this.ngOnInit();
      })
    })

    //provera dal ima rezervacija sa novom vrednoscu knjiga, ako ima rezervacija to znaci da je broj knjga 0
    this.knjigaServis.dohvatiRezervaciju(this.knjiga.id).subscribe((rezervacijaDB: Rezervacija) => {
      if (rezervacijaDB.korisnici.length > 0) {
        //ima rezervacija
        for(let i=0;i<rezervacijaDB.korisnici.length;i++){
          this.zaduzenjeServis.nadjiTrenutnaZaduzenja(rezervacijaDB.korisnici[i]).subscribe((zaduzenjeDB:Zaduzenje[])=>{
            if(zaduzenjeDB.length<3){
              if(this.proveraKasnjeja(zaduzenjeDB)){
                if(brojDodatihKnjiga>0){
                  brojDodatihKnjiga--;
                  this.knjigaServis.izbrisiKorisnika(this.knjiga.id,rezervacijaDB.korisnici[i]).subscribe((resp)=>{
                    if (resp['message'] == 'ok') {
                      let datum=this.formirajDatum();
                      this.zaduzenjeServis.novoZaduzenje(this.knjiga.id,rezervacijaDB.korisnici[i],datum,1).subscribe((resp)=>{
                        if (resp['message'] == 'ok') {
                         
                          this.knjigaServis.promeniBrojKnjiga(this.knjiga.id,  brojDodatihKnjiga).subscribe(resp => {
                            this.upBrojKnjiga = false;
                            this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
                      
                      
                              localStorage.setItem("knjiga", JSON.stringify(data));
                              //console.log(data.brojKnjiga)
                      
                              this.ngOnInit();
                            })
                          })
                          
                        }
                      })
                    }
                  })
                }
              }
            }
          })
        }
        
      }
    })

   

  }

  izracunajRazlikuVremena(datumZaduzenja) {
    let now = new Date();
    let zaduzenje = new Date(datumZaduzenja)
    return ((now.getTime() - zaduzenje.getTime()) / (1000 * 3600 * 24))
  }



  proveraKasnjeja(datumZaduzenjaLista) {
    let sviDobri = true;
    for (let i = 0; i < datumZaduzenjaLista.length; i++) {
      let prod = 0;
      if (datumZaduzenjaLista[i].produzenje > 0) {
        prod = this.rok;
      }
      var razlikaVreme = this.izracunajRazlikuVremena(datumZaduzenjaLista[i].datumZaduzenja);
      if (razlikaVreme > this.rok) sviDobri = false;
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



  updateSlika() {
    this.knjigaServis.promeniSliku(this.knjiga.id, this.slika).subscribe(resp => {
      this.upSlika = false;
      this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)
        this.ngOnInit();
      })
    })

  }



  slika: any;
  selectFile(event: any) {
    //Moze i bez slike

    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.slika = '';
    } else {
      var mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {

        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {
        var img = new Image();


        this.slika = _event.target.result;
      }
    }


  }

















  zaduzi() {
    if (this.korisnik.tip == '5') {
      this.message = 'Trenutno ste blokirani'
      return;
    }
    if (!this.vecImaKnjigu) {

      if (Number(this.knjiga.brojKnjiga) > 0) {
        //PROVERA DAL IMA U ZADUZENJU
        if (!this.nevracenaKnjiga) {
          if (this.korisnikTekucaZaduzenja.length < 3) {
            //PROSLE SVE PROVERE MOZE KNJIGA DA SE UZME, NEW ZADUZENJE
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

            //console.log(st)
            this.zaduzenjeServis.novoZaduzenje(this.knjiga.id, this.korisnik.korisnickoIme, st, 0).subscribe(resp => {
              if (resp['message'] == 'ok') {
                this.message = "Usepesno zaduzeno";

                //smanji broj knjige
                this.knjigaServis.decBrojKnjiga(this.knjiga.id).subscribe(resp => {
                  if (resp['message'] == 'ok') {

                    //PROBLEM NE SMANJUJE SE BROJ KNJIGE
                    this.knjigaServis.uzmiKnjigu(this.knjiga.id).subscribe((data: Knjiga) => {
                      localStorage.setItem("knjiga", JSON.stringify(data));
                      //console.log(data.brojKnjiga)
                      this.ngOnInit();
                    })





                  }
                  else {
                    alert("Doslo je do greske")
                  }
                })


              }
              else {
                alert("Doslo je do greske")
              }
            })

          } else {
            this.message = "Vec imate tri zaduzenje knjige";
          }

        } else {
          this.message = "Vratite prvo knjigu kojoj je isteklo vreme!"
        }




      } else {
        this.message = "Nema vise date knjige na stanju"
      }

    } else {
      this.message = "Vec ste zaduzili ovu knjigu!"
    }

  }

  messageKoment: string


  formirajDatumVreme(){
    let now = new Date()
    console.log(now.toLocaleTimeString())
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
    let [hour, min, again] = now.toTimeString().split(":")
    let [sec, temp] = again.split(" ");
    st=st+" " + hour + ":" + min + ":" + sec;
    return st;

    
  }

  dodajKomentar() {

    //USLOV DA IMA KNJIGU U ZADUZENJU I DA NIJE VEC KOMENTARISAO DVA FOR-A SA IF
    if (this.korisnik.tip == '5') {
      this.messageKoment = "Trenutno ste blokirani"
      return;
    }
    if (this.tekstNovogKomentara.length < 1000) {
      if (this.vecImaKnjiguZaKomentar) {
        if (!this.vecImaKomentar) {

          // let now = new Date();

          // let [day, month, year] = now.toLocaleDateString().split("/");
          // let [hour, min, again] = now.toTimeString().split(":")
          // let [sec, temp] = again.split(" ");

          // let st = year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
          let st=this.formirajDatumVreme();

          this.knjigaServis.dodajKomentar(this.knjiga.id, this.korisnik.korisnickoIme, this.tekstNovogKomentara, this.ocenaNovogKomentara, st).subscribe(resp => {
            if (resp['message'] == 'ok') {
              this.messageKoment = "Vas komentar je uspesno dodat";
              this.ngOnInit();
            }
            else {
              this.messageKoment = "Doslo je do greske";
            }
          })

        } else {
          this.messageKoment = "Vec ste napisali komentar";
        }

      }
      else {
        this.messageKoment = "Morate prvo da zaduzite knjigu"
      }
    }
    else {
      this.messageKoment = 'Komentar mora da ima manje od 1000 karaktera'
    }
  }


  upKomentar: boolean[];

  promeniKomentar(index) {
    this.upKomentar[index] = true;
  }

  updateKomentar(index, korisnickoIme, idKnjiga) {
    this.knjigaServis.promeniKomentar(this.novTekst, korisnickoIme, idKnjiga).subscribe(resp => {
      if (resp['message'] == 'ok') {

        this.ngOnInit();
      }
    })

    this.upKomentar[index] = false;

  }

  ocenaJedaniliDva(komentar) {
    if (komentar.ocena == 1 || komentar.ocena == 0 || komentar.ocena == 2) return true;
    return false;
  }
  ocenaTriliCetiri(komentar) {
    if (komentar.ocena == 3 || komentar.ocena == 4) return true;
    return false;
  }
  ocenaPetiliSest(komentar) {
    if (komentar.ocena == 5 || komentar.ocena == 6) return true;
    return false;
  }
  ocenaSedamiliOsam(komentar) {
    if (komentar.ocena == 7 || komentar.ocena == 8) return true;
    return false;
  }
  ocenaDevetiliDeset(komentar) {
    if (komentar.ocena == 9 || komentar.ocena == 10) return true;
    return false;
  }

  mojKomentar(korisnickoIme) {
    if (korisnickoIme == this.korisnik.korisnickoIme) return 1;
    return 0;
  }
}
