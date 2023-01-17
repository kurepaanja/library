import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';
import { Zaduzenje } from '../model/zaduzenje';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-admin-korisnici',
  templateUrl: './admin-korisnici.component.html',
  styleUrls: ['./admin-korisnici.component.css']
})
export class AdminKorisniciComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private zaduzenjeServis:ZaduzenjeService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.imaKorisnika = false;
    this.sviKorisnici = [];

    this.upIme = [false];
    this.upKor = [false];
    this.upSifra = [false];
    this.upTip = [false];
    this.upAdresa = [false];
    this.upTelefon = [false];
    this.upEmail = [false];
    this.upSlika = [false];

    this.korisnikServis.uzmiRegKorisnike().subscribe((data: Korisnik[]) => {
      if (data.length > 0) this.imaKorisnika = true;
      for (let index = 0; index < data.length; index++) {
        this.sviKorisnici[index] = data[index]
        this.upIme[index] = false;
        this.upKor[index] = false;
        this.upSifra[index] = false;
        this.upTip[index] = false;
        this.upAdresa[index] = false;
        this.upTelefon[index] = false;
        this.upEmail[index] = false;
        this.upSlika[index] = false

      }

    })
  }
  korisnik: Korisnik
  sviKorisnici: Korisnik[];
  imaKorisnika: boolean

  novTekst: string;

  upIme: boolean[];
  upKor: boolean[];
  upSifra: boolean[];
  upTip: boolean[];
  upAdresa: boolean[];
  upTelefon: boolean[];
  upEmail: boolean[];
  upSlika: boolean[];

  promeniIme(index) {
    this.upIme[index] = true;
  }

  promeniKor(index) {
    this.upKor[index] = true;
  }

  promeniSifra(index) {
    this.upSifra[index] = true;
  }



  promeniAdresa(index) {
    this.upAdresa[index] = true;
  }

  promeniTelefon(index) {
    this.upTelefon[index] = true;
  }

  promeniEmail(index) {
    this.upEmail[index] = true;
  }
  promeniSlika(index) {
    this.upSlika[index] = true;
  }

  updateIme(index, korisnickoIme) {
    let ar = this.novTekst.split(" ");
    let ime = ar[0];
    let prezime = ar[1];

    this.korisnikServis.promeniIme(korisnickoIme, ime, prezime).subscribe((resp) => {
      if (resp['message'] == 'ok') {

        this.upIme[index] = false
        this.ngOnInit();
      }
    })

  }

  updateKor(index, korisnickoIme) {
    this.korisnikServis.promeniKorisnickoIme(korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {

        this.upKor[index] = false
        this.ngOnInit();
      }
    })
  }

  updateSifra(index, korisnickoIme) {
    this.korisnikServis.promeniLozinku(korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {

        this.upSifra[index] = false
        this.ngOnInit();
      }
    })

  }


  povecajTip(index, korisnickoIme) {
    this.korisnikServis.promeniTip(korisnickoIme, "2").subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.ngOnInit();
      }
    })

  }

  smanjiTip(index, korisnickoIme) {
    this.korisnikServis.promeniTip(korisnickoIme, "1").subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.ngOnInit();
      }
    })
  }

  updateAdresa(index, korisnickoIme) {
    this.korisnikServis.promeniAdresu(korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.upAdresa[index] = false;
        this.ngOnInit();
      }
    })

  }

  updateTelefon(index, korisnickoIme) {
    this.korisnikServis.promeniTelefon(korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.upTelefon[index] = false;
        this.ngOnInit();
      }
    })

  }

  updateEmail(index, korisnickoIme) {
    this.korisnikServis.promeniEmail(korisnickoIme, this.novTekst).subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.upEmail[index] = false;
        this.ngOnInit();
      }
    })

  }

  updateSlika(index, korisnickoIme) {
    if (this.slika == undefined) {
      this.korisnikServis.promeniSlika(korisnickoIme, '').subscribe(resp => {
        if (resp['message'] == 'ok') {
          this.upSlika[index] = false;
          this.ngOnInit();
        }
      })
    } else {
      this.korisnikServis.promeniSlika(korisnickoIme, this.slika).subscribe(resp => {
        if (resp['message'] == 'ok') {
          this.upSlika[index] = false;
          this.ngOnInit();
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


  izbrisiKor(korisnickoIme) {
    //PROVERA DAL KOR IMA ZADUZENJE
    this.zaduzenjeServis.nadjiZaduzenje(korisnickoIme).subscribe((data:Zaduzenje[])=>{
      if(data.length>0){
        alert(korisnickoIme+" ne moze da se izbrise, ima zaduzenja")
      }else{
        this.korisnikServis.odbaciKorisnika(korisnickoIme).subscribe(resp=>{
          if (resp['message'] == 'ok') {
            this.ngOnInit();
          }
        })
      }
    })
  }

  blokirajKor(korisnickoIme){
    this.korisnikServis.promeniTip(korisnickoIme, "5").subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.ngOnInit();
      }
    })
  } 

  oblokirajKor(korisnickoIme){
    this.korisnikServis.promeniTip(korisnickoIme, "1").subscribe(resp => {
      if (resp['message'] == 'ok') {
        this.ngOnInit();
      }
    })
  }

  

  korCitalac(tip) {
    if (tip == 1) return true;
    return false;
  }

  korModerator(tip) {
    if (tip == 2) return true;
    return false;
  }

  korBlokiran(tip){
    if(tip==5) return true;
    return false;
  }



  //REGISTRACIJA NOVOG KORISNIKA

  registerForm = this.fb.group({
    ime: ['', [Validators.required]],
    prezime: ['', [Validators.required]],
    korisnickoIme: ['', [Validators.required]],
    lozinka: ['', [Validators.required, Validators.pattern("^[A-Z]((?=.*[!@#$&*.])(?=.*[0-9])(?=.*[a-z]).{7,11})$")]],
    lozinkaConfirm: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    telefon: ['', [Validators.required]],
    adresa: ['', [Validators.required]]

  }, {
    validators: this.mustMatch('lozinka', 'lozinkaConfirm')
  })

  mustMatch(password: any, passwordAgain: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const passwordAgainControl = formGroup.controls[passwordAgain];

      if (passwordAgainControl.errors && !passwordAgainControl.errors['mustMatch']) {
        return;
      }

      if (passwordControl.value !== passwordAgainControl.value) {
        passwordAgainControl.setErrors({ mustMatch: true })
      } else {
        passwordAgainControl.setErrors(null);
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  warning: string;
  dobriPodaci: number;

  //Provera jedinstvenosti korisnickogImena i imena
  validnaRegForma() {
    if (this.registerForm.controls['lozinka'].valid) {
      if (this.registerForm.controls['email'].valid) {

        this.korisnikServis.korisnickoImePostoji(this.registerForm.controls['korisnickoIme'].value).subscribe((korDB: Korisnik) => {
          if (!korDB) {
            this.korisnikServis.emailPostoji(this.registerForm.controls['email'].value).subscribe((korDB2: Korisnik) => {
              if (!korDB2) {
                this.warning='';
                this.dobriPodaci = 1;
              }
              else {
               
                this.warning = 'Korisnik sa ovom email adresom vec postoji'
              }

            })
          } else {
           
            this.warning = "Korisnik sa ovim korisnickim imenom vec postoji"
          }
        })


      } else {
        this.dobriPodaci = 0;
        this.warning = 'Pogresan format email adrese'
      }

    } else {
      this.dobriPodaci = 0;
      this.warning = 'Pogresan format lozinke';
      if (!this.registerForm.controls['email'].valid) {
        this.warning += ',Pogresan format email adrese'
      }
    }

  }

  register() {
    this.validnaRegForma();
    if (this.dobriPodaci) {
      console.log(this.dobriPodaci);
      console.log(this.slika);
      let ime=this.registerForm.controls['ime'].value;
      let prezime=this.registerForm.controls['prezime'].value;
      let korisnickoIme=this.registerForm.controls['korisnickoIme'].value;
      let lozinka=this.registerForm.controls['lozinka'].value;
      let email=this.registerForm.controls['email'].value;
      let telefon=this.registerForm.controls['telefon'].value;
      let adresa=this.registerForm.controls['adresa'].value;
      let tip='1';
      //this.slika
      if(this.slika==undefined) this.slika=''
     
      this.warning='0'

      this.korisnikServis.register(ime,prezime,korisnickoIme,lozinka,email,telefon,adresa,tip,this.slika).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.ngOnInit();
        }
        else{
          alert("Doslo je do greske")
        }
      })


    }

  }


}
