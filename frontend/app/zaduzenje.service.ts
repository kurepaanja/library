import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZaduzenjeService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  nadjiZaduzenje(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/zaduzenje/nadjiZaduzenje`,data);
  }

  nadjiZaduzenjeKnjiga(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/zaduzenje/nadjiZaduzenjeKnjiga`,data)
  }

  novoZaduzenje(idKnjigaForm,korisnickoImeForm,datumZaduzenjaForm,rezervacijaForm){
    const data={
      idKnjiga:idKnjigaForm,
      korisnickoIme:korisnickoImeForm,
      datumZaduzenja:datumZaduzenjaForm,
      rezervacija:rezervacijaForm
    }
    return this.http.post(`${this.uri}/zaduzenje/novoZaduzenje`,data)
  }

  zavrsiZaduzenje(idKnjigaForm,korisnickoImeForm,datumVracanjaForm){
    const data={
      idKnjiga:idKnjigaForm,
      korisnickoIme:korisnickoImeForm,
      datumVracanja:datumVracanjaForm
    }
    return this.http.post(`${this.uri}/zaduzenje/zavrsiZaduzenje`,data)
  }

  sortDatumVracanjaDS(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/zaduzenje/sortDatumVracanjaDS`,data)
  }

  sortDatumVracanjaAS(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/zaduzenje/sortDatumVracanjaAS`,data)
  }

  sortDatumZaduzenjaDS(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/zaduzenje/sortDatumZaduzenjaDS`,data);
  }

  sortDatumZaduzenjaAS(korisnickoImeForm){
    const data={
      korisnickoIme:korisnickoImeForm
    }
    return this.http.post(`${this.uri}/zaduzenje/sortDatumZaduzenjaAS`,data)
  }

  produzi(korisnickoImeForm,idKnjigaForm,produzenjeFrom){
    const data={
      korisnickoIme:korisnickoImeForm,
      idKnjiga:idKnjigaForm,
      produzenje:produzenjeFrom
    }
    return this.http.post(`${this.uri}/zaduzenje/produzi`,data)
  }

  nadjiTrenutnaZaduzenja(korisnickoIme){
    const data={
      korisnickoIme:korisnickoIme
    }
    return this.http.post(`${this.uri}/zaduzenje/nadjiTrenutnaZaduzenja`,data)
  }

  changeProduzenje(produzenjeFrom){
    const data={
      changeProduzenje:produzenjeFrom
    }
    return this.http.post(`${this.uri}/zaduzenje/changeProduzenje`,data)
  }
}
