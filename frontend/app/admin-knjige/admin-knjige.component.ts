import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalService } from '../global.service';
import { KnjigaService } from '../knjiga.service';
import { GlobalDB } from '../model/global';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { Rezervacija } from '../model/rezervacija';
import { Zaduzenje } from '../model/zaduzenje';
import { ZaduzenjeService } from '../zaduzenje.service';

@Component({
  selector: 'app-admin-knjige',
  templateUrl: './admin-knjige.component.html',
  styleUrls: ['./admin-knjige.component.css']
})
export class AdminKnjigeComponent implements OnInit {

  constructor(private knjigaServis:KnjigaService,private zaduzenjeServis:ZaduzenjeService,private fb:FormBuilder,private globalServis:GlobalService) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('logovan'));
    this.sveKnjige=[];
    this.upNaziv=[];
    this.upAutor=[]
    this.upZanr=[]
    this.upIzdavac=[]
    this.upGodina=[]
    this.upJezik=[]
    this.upBrojKnjiga=[]
    this.upSlika=[]

    this.globalServis.getDaysReturn().subscribe((data:GlobalDB)=>{
      this.rok=data[0].daysReturn
      this.sledID=data[0].idKnjiga
      //console.log(this.rok)
    })

    this.knjigaServis.sveKnjige().subscribe((data:Knjiga[])=>{
      
      
      for (let index = 0; index < data.length; index++) {
        this.sveKnjige[index]=data[index];
        this.upNaziv[index]=false;
        this.upAutor[index]=false;
        this.upZanr[index]=false;
        this.upIzdavac[index]=false;
        this.upGodina[index]=false;
        this.upJezik[index]=false;
        this.upBrojKnjiga[index]=false;
        this.upSlika[index]=false;
      }
    })
    
  }
  korisnik:Korisnik
  sveKnjige:Knjiga[];

  brisiKnjigu(id,naziv){
    this.zaduzenjeServis.nadjiZaduzenjeKnjiga(id).subscribe((data:Zaduzenje[])=>{
      if(data.length>0){
        alert(naziv + " je trenutno zaduzen i ne moze da se izbrise")
      }
      else{
        this.knjigaServis.izbrisiKnjigu(id).subscribe((resp)=>{
          if(resp['message']=='ok'){
            this.ngOnInit();
          }
        })
      }
    })
  }


  rok:number
  upNaziv:boolean[];
  upAutor:boolean[];
  upZanr:boolean[];
  upIzdavac:boolean[];
  upGodina:boolean[]
  upJezik:boolean[];
  upBrojKnjiga:boolean[];
  upSlika:boolean[];
  
  novTekst:string;
  

  promeniNaziv(index){
    
    this.upNaziv[index]=true;

  }

  promeniAutor(index){
    this.upAutor[index]=true;
  }

  promeniZanr(index){
    this.upZanr[index]=true;
  }

  promeniIzdavac(index){
    this.upIzdavac[index]=true;
  }

  promeniGodina(index){
    this.upGodina[index]=true
  }

  promeniJezik(index){
    this.upJezik[index]=true;
  }

  promeniBrojKnjiga(index){
    this.upBrojKnjiga[index]=true;
  }

  promeniSlika(index){
    this.upSlika[index]=true;
  }



  updateNaziv(index,id){
    this.knjigaServis.promeniNaziv(id,this.novTekst).subscribe(resp=>{
      if(resp['message']=='ok'){
        this.upNaziv[index]=false;
        this.ngOnInit();
      }
    })
   
  }

  updateAutor(index,id){
    let autor=this.novTekst.split(",")
    this.knjigaServis.promeniAutor(id,autor).subscribe(resp=>{
      this.upAutor[index]=false;
      this.ngOnInit();
      
    })
   
  }

  updateZanr(index,id){
    let zanr=this.novTekst.split('zanr')
    this.knjigaServis.promeniZanr(id,zanr).subscribe(resp=>{
      if(resp['message']=='ok'){
        this.upZanr[index]=false;
        this.ngOnInit();
        
      }
    })
    
  }

  updateIzdavac(index,id){
    this.knjigaServis.promeniIzdavac(id,this.novTekst).subscribe(resp=>{
      if(resp['message']=='ok'){
        this.upIzdavac[index]=false;
        this.ngOnInit();
      }
    })
    
  }

  updateGodina(index,id){
    this.knjigaServis.promeniGodina(id,this.novTekst).subscribe(resp=>{
      if(resp['message']=='ok'){
        this.upGodina[index]=false;
        this.ngOnInit();
        
      }
      
    })
    
  }

  updateJezik(index,id){
    this.knjigaServis.promeniJezik(id,this.novTekst).subscribe(resp=>{
      if(resp['message']=='ok'){
          this.upJezik[index]=false;
          this.ngOnInit();
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


  imaKorisnika:boolean;
  
  updateBrojKnjiga(index,id){
    // this.knjigaServis.promeniBrojKnjiga(id,this.novTekst).subscribe(resp=>{
    //   if(resp['message']=='ok'){
    //       this.upBrojKnjiga[index]=false;
    //       this.ngOnInit();
    //   }
     
    // })
    this.imaKorisnika=false;
    let brojDodatihKnjiga=Number(this.novTekst)
    this.upBrojKnjiga[index] = false;

    this.knjigaServis.promeniBrojKnjiga(id, this.novTekst).subscribe(resp => {
      
      this.knjigaServis.uzmiKnjigu(id).subscribe((data: Knjiga) => {


        localStorage.setItem("knjiga", JSON.stringify(data));
        //console.log(data.brojKnjiga)

        this.ngOnInit();
      })
    })

    //provera dal ima rezervacija sa novom vrednoscu knjiga, ako ima rezervacija to znaci da je broj knjga 0
    this.knjigaServis.dohvatiRezervaciju(id).subscribe((rezervacijaDB: Rezervacija) => {
      if (rezervacijaDB.korisnici.length > 0) {
        //ima rezervacija
        for(let i=0;i<rezervacijaDB.korisnici.length;i++){
          this.zaduzenjeServis.nadjiTrenutnaZaduzenja(rezervacijaDB.korisnici[i]).subscribe((zaduzenjeDB:Zaduzenje[])=>{
            if(zaduzenjeDB.length<3){
              if(this.proveraKasnjeja(zaduzenjeDB)){
                if(brojDodatihKnjiga>0){
                  this.knjigaServis.izbrisiKorisnika(id,rezervacijaDB.korisnici[i]).subscribe((resp)=>{
                    if (resp['message'] == 'ok') {
                      let datum=this.formirajDatum();
                      this.zaduzenjeServis.novoZaduzenje(id,rezervacijaDB.korisnici[i],datum,1).subscribe((resp)=>{
                        if (resp['message'] == 'ok') {
                          brojDodatihKnjiga--;
                          this.knjigaServis.promeniBrojKnjiga(id,  brojDodatihKnjiga).subscribe(resp => {
                            
                            this.knjigaServis.uzmiKnjigu(id).subscribe((data: Knjiga) => {
                      
                      
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

  updateSlika(index,id){
    if(this.slika==undefined){
      this.knjigaServis.promeniSliku(id,'').subscribe(resp=>{
        if(resp['message']=='ok'){
          this.upSlika[index]=false;
          this.ngOnInit()
        }
        
      })
    }else{
      this.knjigaServis.promeniSliku(id,this.slika).subscribe(resp=>{
        if(resp['message']=='ok'){
          this.upSlika[index]=false;
          this.ngOnInit()
        }
        
      })
    }
    
    
  }


  
  slika:any;
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


  ///DODAVANJE KNJIGE
  sledID:string;

  form=this.fb.group({
    naziv:['',Validators.required],
    autor:['',Validators.required],
    zanr:  new FormArray([]),
    godinaIzdanja:['',Validators.required],
    jezik:['',Validators.required],
    ukupno:['',Validators.required],
    izdavac:['',Validators.required]
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



  zanrovi:Array<any>=[
    {name:"Fantazija",value:"Fantazija"},
    {name:"Drama",value:"Drama"},
    {name:"Mitologija",value:"Mitologija"},
    {name:"Klasicna knjizevnost",value:"Klasicna knjizevnost"},
    {name:"Avantura",value:"Avantura"}
  ];


  message:string;
  

  dodajKnjigu(){
    if(this.form.valid){
      //sledID
      let naziv=this.form.controls['naziv'].value;
      let autori=this.form.controls['autor'].value.split(',');
      let zanr=this.form.controls['zanr'].value;
      let izdavac=this.form.controls['izdavac'].value;
      let godinaIzdanja=this.form.controls['godinaIzdanja'].value;
      let jezik=this.form.controls['jezik'].value;
      let broj=this.form.controls['ukupno'].value;
      //slika
      if(this.slika==undefined) this.slika=''

      this.knjigaServis.dodajKnjigu(this.sledID,naziv,autori,zanr,izdavac,godinaIzdanja,jezik,broj,this.slika).subscribe((resp)=>{
        if(resp['message']=='ok'){
          this.knjigaServis.napraviRezervaciju(this.sledID).subscribe((resp)=>{
            if(resp['message']=='ok'){
              this.ngOnInit();
            }
          })
        
        }
      })
      

      
      
    }else{
      this.message="Popunite sva polja"
    }
   
   
  }

}
