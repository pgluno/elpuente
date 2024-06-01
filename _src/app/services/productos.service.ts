import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constantes } from './constantes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient, private router : Router) {

  }


  getProductos(page : any | null, nombre : any | null, categoria : any | null, talla : any | null, color : any | null) {

    if (page == 'NULL') {
      return this.http.get(Constantes.apiUrl + '/productos');
    } else {

      if(nombre == null && categoria == null && talla == null && color == null){
        return this.http.get(Constantes.apiUrl + '/productos?page=' + page);
      }else{
        return this.http.get(Constantes.apiUrl + '/productos/'+nombre+'/'+categoria+'/'+talla+'/'+color+'?page=' + page );
      }

    }

  }



}
