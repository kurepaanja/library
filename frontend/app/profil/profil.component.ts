import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { KnjigaService } from '../knjiga.service';
import { KorisnikService } from '../korisnik.service';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zaduzenje } from '../model/zaduzenje';
import { ZaduzenjeKnjiga } from '../model/ZaduzenjeKnjiga';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {


  public barChartOneLegend = true;
  public barChartOnePlugins = [];
  public barChartOneData: ChartConfiguration<'bar'>['data'];

  // public barChartOneData: ChartConfiguration<'bar'>['data'] = {
  //   labels: [ 'Drama', 'Fantazija', 'Mitologija', 'Avantura', 'Klasicna knjizevnost'],
  //   datasets: [
  //     { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Broj procitanih knjiga po zanrovima' },
  //   ]
  // };

  public barChartOneOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public barChartTwoLegend = true;
  public barChartTwoPlugins = [];
  public barChartTwoData: ChartConfiguration<'bar'>['data'];
  public barChartTwoOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };




  constructor(private korisnikServis: KorisnikService, private zaduzenjeServis: ZaduzenjeService, private knjigaServis: KnjigaService) { }

  ngOnInit(): void {
    this.hasImage = false;
    this.novTekst = ''
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    if (this.korisnik.slika != "") {
      this.hasImage = true;
    } else {
      console.log(this.korisnik.slika);
      this.hasImage = false;
    }

    var canvasElement = document.getElementById("myChart_one")
    var config = {}

    //ZA GRAF ZA ZANROVE

    this.listaKnjgaZaduzenja = []
    this.cntDrama = 0;
    this.cntAvantura = 0;
    this.cntFantazija = 0;
    this.cntKlasicnaKnjizevnost = 0;
    this.cntMitologija = 0;
    this.startCountZanr = 0;

    this.barChartOneData = {
      labels: ['Drama', 'Fantazija', 'Mitologija', 'Avantura', 'Klasicna knjizevnost'],
      datasets: [
        { data: [this.cntDrama, this.cntFantazija, this.cntMitologija, this.cntAvantura, this.cntKlasicnaKnjizevnost], label: 'Broj procitanih knjiga po zanrovima' },
      ]
    };




    this.zaduzenjeServis.nadjiZaduzenje(this.korisnik.korisnickoIme).subscribe((zaduzenjeDB: Zaduzenje[]) => {
      //console.log(zaduzenjeDB.length)
      for (let i = 0; i < zaduzenjeDB.length; i++) {
        this.knjigaServis.uzmiKnjigu(zaduzenjeDB[i].idKnjiga).subscribe((knjigaDB: Knjiga) => {
          //popunjavam autor koji ce da mi vrsi funkciju zanra
          this.listaKnjgaZaduzenja[i] = new ZaduzenjeKnjiga();
          this.listaKnjgaZaduzenja[i].autor = []
          for (let j = 0; j < knjigaDB.zanr.length; j++) {
            this.listaKnjgaZaduzenja[i].autor[j] = knjigaDB.zanr[j];
          }
          //console.log(this.startCountZanr)
          this.startCountZanr++;
          if (this.startCountZanr == zaduzenjeDB.length) {
            //console.log(this.listaKnjgaZaduzenja)
            for (let j = 0; j < this.listaKnjgaZaduzenja.length; j++) {
              let str = this.listaKnjgaZaduzenja[j].autor.join()
              if (str.includes("Drama")) this.cntDrama++;
              if (str.includes("Mitologija")) this.cntMitologija++;
              if (str.includes("Fantazija")) this.cntFantazija++;
              if (str.includes("Avantura")) this.cntAvantura++;
              if (str.includes("Klasicna knjizevnost")) this.cntKlasicnaKnjizevnost++;
            }
            // console.log(this.cntDrama)
            // console.log(this.cntMitologija)
            // console.log(this.cntFantazija)
            // console.log(this.cntAvantura)
            // console.log(this.cntKlasicnaKnjizevnost)
            this.barChartOneData = {
              labels: ['Drama', 'Fantazija', 'Mitologija', 'Avantura', 'Klasicna knjizevnost'],
              datasets: [
                { data: [this.cntDrama, this.cntFantazija, this.cntMitologija, this.cntAvantura, this.cntKlasicnaKnjizevnost], label: 'Broj procitanih knjiga po zanrovima' },
              ]
            };
          }

        })

      }


    })

    this.cntJanuar = 0;
    this.cntFebruar = 0;
    this.cntMart = 0;
    this.cntApril = 0;
    this.cntMaj = 0;
    this.cntJun = 0;
    this.cntJul = 0;
    this.cntAvgust = 0;
    this.cntSeptembar = 0;
    this.cntNovembar = 0;
    this.cntDecembar = 0;
    this.startCountMesec = 0;


    this.barChartTwoData = {
      labels: ['Januar', 'Februar', 'Mart', 'April', 'Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
      datasets: [
        { data: [this.cntJanuar, this.cntFebruar, this.cntMart, this.cntApril, this.cntMaj,this.cntJun,this.cntJul,this.cntAvgust,this.cntSeptembar
        ,this.cntOktobar,this.cntNovembar,this.cntDecembar], label: 'Broj procitanih knjiga po mesecima' },
      ]
    };

    //GRAF ZA PROCITANE KNJIGE
    this.zaduzenjeServis.nadjiZaduzenje(this.korisnik.korisnickoIme).subscribe((zaduzenjeDB: Zaduzenje[]) => {

      for (let i = 0; i < zaduzenjeDB.length; i++) {
        let date = new Date(zaduzenjeDB[i].datumZaduzenja)
        //console.log(zaduzenjeDB[i].datumZaduzenja)
        console.log(date)
        //console.log(date.getMonth() + 1)
        if (date.getMonth() + 1 == 1) this.cntJanuar++;
        if (date.getMonth() + 1 == 2) this.cntFebruar++
        if (date.getMonth() + 1 == 3) this.cntMart++
        if (date.getMonth() + 1 == 4) this.cntApril++
        if (date.getMonth() + 1 == 5) this.cntMaj++
        if (date.getMonth() + 1 == 6) this.cntJun++
        if (date.getMonth() + 1 == 7) this.cntJul++
        if (date.getMonth() + 1 == 8) this.cntAvgust++
        if (date.getMonth() + 1 == 9) this.cntSeptembar++
        if (date.getMonth() + 1 == 10) this.cntOktobar++
        if (date.getMonth() + 1 == 11) this.cntNovembar++
        if (date.getMonth() + 1 == 12) this.cntDecembar++
        
        this.startCountMesec++
        if(this.startCountMesec==zaduzenjeDB.length){
          console.log(this.cntAvgust)
          this.barChartTwoData = {
            labels: ['Januar', 'Februar', 'Mart', 'April', 'Maj','Jun','Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
            datasets: [
              { data: [this.cntJanuar, this.cntFebruar, this.cntMart, this.cntApril, this.cntMaj,this.cntJun,this.cntJul,this.cntAvgust,this.cntSeptembar
              ,this.cntOktobar,this.cntNovembar,this.cntDecembar], label: 'Broj procitanih knjiga po mesecima' },
            ]
          };
        
        }



      }
    })




  }

  startCountMesec: number;
  cntJanuar: number;
  cntFebruar: number;
  cntMart: number;
  cntApril: number;
  cntMaj: number;
  cntJun: number;
  cntJul: number;
  cntAvgust: number;
  cntSeptembar: number;
  cntOktobar: number;
  cntNovembar: number;
  cntDecembar: number;


  startCountZanr: number;
  cntDrama: number;
  cntFantazija: number;
  cntMitologija: number;
  cntAvantura: number;
  cntKlasicnaKnjizevnost: number;
  listaZaduzenja: Zaduzenje[];
  listaKnjgaZaduzenja: ZaduzenjeKnjiga[];

  hasImage: boolean;
  korisnik: Korisnik;

  upIme: boolean;
  upPrezime: boolean
  upKor: boolean;
  upTelefon: boolean;
  upAdresa: boolean;
  upEmail: boolean;
  upSlika: boolean;
  novTekst: string;

  promeniIme() {
    this.upIme = true;
  }

  promeniPrezime() {
    this.upPrezime = true;
  }

  promeniKor() {
    this.upKor = true;
  }

  promeniAdresa() {
    this.upAdresa = true;
  }

  promeniTelefon() {
    this.upTelefon = true;
  }

  promeniEmail() {
    this.upEmail = true;
  }
  promeniSlika() {
    this.upSlika = true;
  }

  updateIme() {
    this.korisnikServis.promeniPrvoIme(this.korisnik.korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.korisnikServis.nadjiKorisnika(this.korisnik.korisnickoIme).subscribe((data: Korisnik) => {
          localStorage.setItem("logovan", JSON.stringify(data));
          this.novTekst = ''
          this.upIme = false
          this.ngOnInit();
        })

      }
    })
  }

  updatePrezime() {
    this.korisnikServis.promeniPrezime(this.korisnik.korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.korisnikServis.nadjiKorisnika(this.korisnik.korisnickoIme).subscribe((data: Korisnik) => {
          localStorage.setItem("logovan", JSON.stringify(data));
          this.novTekst = ''
          this.upPrezime = false
          this.ngOnInit();
        })
      }
    })
  }

  updateKor() {
    this.korisnikServis.korisnickoImePostoji(this.novTekst).subscribe((kor: Korisnik) => {
      if (!kor) {
        this.korisnikServis.promeniKorisnickoIme(this.korisnik.korisnickoIme, this.novTekst).subscribe(resp => {
          if (resp['message'] == 'ok') {
            this.korisnikServis.nadjiKorisnika(this.novTekst).subscribe((data: Korisnik) => {
              localStorage.setItem("logovan", JSON.stringify(data));
              this.novTekst = ''
              this.upKor = false
              this.ngOnInit();
            })
          }
        })
      } else {
        alert("Korisnicko ime koje ste napisali vec psotoji")
      }
    })

  }

  updateTelefon() {
    this.korisnikServis.promeniTelefon(this.korisnik.korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.korisnikServis.nadjiKorisnika(this.korisnik.korisnickoIme).subscribe((data: Korisnik) => {
          localStorage.setItem("logovan", JSON.stringify(data));
          this.novTekst = ''
          this.upTelefon = false
          this.ngOnInit();
        })
      }
    })

  }

  updateAdresa() {
    this.korisnikServis.promeniAdresu(this.korisnik.korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.korisnikServis.nadjiKorisnika(this.korisnik.korisnickoIme).subscribe((data: Korisnik) => {
          localStorage.setItem("logovan", JSON.stringify(data));
          this.novTekst = ''
          this.upAdresa = false
          this.ngOnInit();
        })
      }
    })
  }

  updateEmail() {
    this.korisnikServis.emailPostoji(this.novTekst).subscribe((kor: Korisnik) => {
      if (!kor) {
        this.korisnikServis.promeniEmail(this.korisnik.korisnickoIme, this.novTekst).subscribe(resp => {
          if (resp['message'] == 'ok') {
            this.korisnikServis.nadjiKorisnika(this.korisnik.korisnickoIme).subscribe((data: Korisnik) => {
              localStorage.setItem("logovan", JSON.stringify(data));
              this.novTekst = ''
              this.upEmail = false
              this.ngOnInit();
            })
          }
        })
      } else {
        alert("Email koji ste napisali vec postoji")
      }
    })

  }

  updateSlika() {
    if (this.slika == undefined) {
      this.korisnikServis.promeniSlika(this.korisnik.korisnickoIme, '').subscribe(resp => {
        if (resp['message'] == 'ok') {
          this.korisnikServis.nadjiKorisnika(this.korisnik.korisnickoIme).subscribe((data: Korisnik) => {
            localStorage.setItem("logovan", JSON.stringify(data));
            this.novTekst = ''
            this.upSlika = false
            this.ngOnInit();
          })

        }
      })
    } else {
      this.korisnikServis.promeniSlika(this.korisnik.korisnickoIme, this.slika).subscribe(resp => {
        if (resp['message'] == 'ok') {
          this.korisnikServis.nadjiKorisnika(this.korisnik.korisnickoIme).subscribe((data: Korisnik) => {
            localStorage.setItem("logovan", JSON.stringify(data));
            this.novTekst = ''
            this.upSlika = false
            this.ngOnInit();
          })

        }
      })
    }
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


}
