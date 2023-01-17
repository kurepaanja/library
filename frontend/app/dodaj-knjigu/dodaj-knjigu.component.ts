import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../global.service';
import { KnjigaService } from '../knjiga.service';
import { GlobalDB } from '../model/global';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Zahtev } from '../model/zahtev';

@Component({
  selector: 'app-dodaj-knjigu',
  templateUrl: './dodaj-knjigu.component.html',
  styleUrls: ['./dodaj-knjigu.component.css']
})
export class DodajKnjiguComponent implements OnInit {

  constructor(private knjigaServis: KnjigaService, private fb: FormBuilder, private globalServis: GlobalService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    if (this.korisnik.tip == "1") this.tip = 1; // citalac koji zahteva dodatak
    if (this.korisnik.tip == "2") this.tip = 2; //moderator dodaje knjigu
    this.sviZahtevi = []

    this.globalServis.getDaysReturn().subscribe((data: GlobalDB) => {
      this.sledID = data[0].idKnjiga;
      console.log(this.sledID);
      //povecaj i promeni u globalServis
    })
    //knjigaServis.uzmi sve Zahteve, kod moderatora buce ispisani ispod dodavanja knjige
    this.knjigaServis.sviZahtevi().subscribe((data: Zahtev[]) => {
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        this.sviZahtevi[index] = data[index];

      }
      console.log(this.sviZahtevi)
    })

  }

  sviZahtevi: Zahtev[];
  sledID: string;
  tip: number;

  form = this.fb.group({
    naziv: ['', Validators.required],
    autor: ['', Validators.required],
    zanr: new FormArray([]),
    godinaIzdanja: ['', Validators.required],
    jezik: ['', Validators.required],
    ukupno: ['', Validators.required],
    izdavac: ['', Validators.required]
  })



  onCheckboxChange(event: any) {

    const zanr = (this.form.controls['zanr'] as FormArray);
    if (event.target.checked) {
      zanr.push(new FormControl(event.target.value));
    } else {
      const index = zanr.controls
        .findIndex(x => x.value === event.target.value);
      zanr.removeAt(index);
    }
  }


  korisnik: Korisnik;
  zanrovi: Array<any> = [
    { name: "Fantazija", value: "Fantazija" },
    { name: "Drama", value: "Drama" },
    { name: "Mitologija", value: "Mitologija" },
    { name: "Klasicna knjizevnost", value: "Klasicna knjizevnost" },
    { name: "Avantura", value: "Avantura" }
  ];



  slika: any


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

  message: string;


  dodajKnjigu() {
    if (this.form.valid) {
      //sledID
      let naziv = this.form.controls['naziv'].value;
      let autori = this.form.controls['autor'].value.split(',');
      let zanr = this.form.controls['zanr'].value;
      let izdavac = this.form.controls['izdavac'].value;
      let godinaIzdanja = this.form.controls['godinaIzdanja'].value;
      let jezik = this.form.controls['jezik'].value;
      let broj = this.form.controls['ukupno'].value;
      if(this.slika==undefined) this.slika="";
      //slika

      this.knjigaServis.dodajKnjigu(this.sledID, naziv, autori, zanr, izdavac, godinaIzdanja, jezik, broj, this.slika).subscribe((resp) => {
        if (resp['message'] == 'ok') {
          alert("Usepesno dodata knjiga")
          let temp = Number(this.sledID) + 1;

          this.globalServis.promeniIdKnjiga(temp).subscribe(resp => {
            if (resp['message'] == 'ok') {
              
              //NOVO POLJE ZA REZERVACIJU ZA NOVU KNJIGU
              this.knjigaServis.napraviRezervaciju(this.sledID).subscribe(resp=>{
                if (resp['message'] == 'ok') {
                  this.ngOnInit();
                }
              })
            }
          })
         
        }
      })




    } else {
      this.message = "Popunite sva polja"
    }


  }

  zahtevZaKnjigu() {


    let korisnickoIme = this.korisnik.korisnickoIme;
    let naziv = this.form.controls['naziv'].value;
    let autori = this.form.controls['autor'].value.split(',');
    let zanr = this.form.controls['zanr'].value;
    let izdavac = this.form.controls['izdavac'].value;
    let godinaIzdanja = this.form.controls['godinaIzdanja'].value;
    let jezik = this.form.controls['jezik'].value;
    if(this.slika==undefined) this.slika='';

    //slika 
    this.knjigaServis.dodajZahtev(korisnickoIme, naziv, autori, zanr, izdavac, godinaIzdanja, jezik, this.slika).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.ngOnInit();
        this.message = 'Zahtev uspesno poslat'
      }
    })
  }

  prihvatiZahtev(zahtev) {
    //pravimo novu knjigu
    this.knjigaServis.dodajKnjigu(this.sledID, zahtev.naziv, zahtev.autor, zahtev.zanr, zahtev.izdavac, zahtev.godinaIzdanja, zahtev.jezik, '2', zahtev.slika).subscribe(resp => {
      let temp = Number(this.sledID) + 1;
      this.globalServis.promeniIdKnjiga(temp).subscribe(resp => {
        if (resp['message'] == 'ok') {

          this.knjigaServis.prihvatiZahtev(zahtev.korisnickoIme, zahtev.naziv,zahtev.autor,zahtev.zanr,zahtev.izdavac,zahtev.godinaIzdanja,zahtev.jezik).subscribe(resp => {
            if (resp['message'] == 'ok') {
              this.knjigaServis.napraviRezervaciju(this.sledID).subscribe(resp=>{
                if (resp['message'] == 'ok') {
                  this.ngOnInit();
                }
              })
             
            }
          })
        }
      })

    })


  }

  odbaciZahtev(korisnickoIme, naziv) {
    this.knjigaServis.deleteZahtev(korisnickoIme,naziv).subscribe((resp)=>{
      if (resp['message'] == 'ok') {
        this.ngOnInit();
      }
    })
  }

}
