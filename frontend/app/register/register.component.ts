import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { KorisnikService } from '../korisnik.service';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    this.dobriPodaci = 0;
    this.warning = '';
    this.slika = '';
  }

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

  slika: any
  warningSlika: string;

  selectFile(event: any) {
    //Moze i bez slike

    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.slika = '';
    } else {
      var mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this.warningSlika = "Only images are supported";
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {
        var img = new Image();

        this.warningSlika = "";
        this.slika = _event.target.result;
      }
    }


  } 

  ime:string;
  prezime:string;
  korisnickoIme:string;
  lozinka:string;
  email:string;
  telefon:string;
  adresa:string;
  tip:string;



  register() {
    this.validnaRegForma();
    if (this.dobriPodaci) {
      console.log(this.dobriPodaci);
      console.log(this.slika);
      this.ime=this.registerForm.controls['ime'].value;
      this.prezime=this.registerForm.controls['prezime'].value;
      this.korisnickoIme=this.registerForm.controls['korisnickoIme'].value;
      this.lozinka=this.registerForm.controls['lozinka'].value;
      this.email=this.registerForm.controls['email'].value;
      this.telefon=this.registerForm.controls['telefon'].value;
      this.adresa=this.registerForm.controls['adresa'].value;
      this.tip='4';
      //this.slika
      console.log(this.ime)
      this.warning='0'

      this.korisnikServis.register(this.ime,this.prezime,this.korisnickoIme,this.lozinka,this.email,this.telefon,this.adresa,this.tip,this.slika).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.warning="Zahtev za registraciju poslat"
        }
        else{
          alert("Doslo je do greske")
        }
      })


    }

  }



}
