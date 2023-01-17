import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  getDaysReturn(){
    return this.http.get(`${this.uri}/global/getDaysReturn`);
  }

  promeniRok(rokForm){
    const data={
      rok:rokForm
    }

    return this.http.post(`${this.uri}/global/promeniRok`,data)
  }

  promeniProduzenje(produzenjeForm){
    const data={
      produzenje:produzenjeForm
    }
    return this.http.post(`${this.uri}/global/promeniProduzenje`,data)
  }

  promeniIdKnjiga(idKnjigaForm){
    const data={
      idKnjiga:idKnjigaForm
    }
    return this.http.post(`${this.uri}/global/promeniIdKnjiga`,data)
  }

}
