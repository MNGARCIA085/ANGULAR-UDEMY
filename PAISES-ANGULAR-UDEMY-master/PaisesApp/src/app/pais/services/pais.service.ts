import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais-interface';
 
@Injectable({
  providedIn: 'root'
})
export class PaisService {
 
  private apiUrl: string = "https://restcountries.com/v3.1";

  get httpParams(){
    return new HttpParams().set(
      'fields','name,capital,cca2,flags,population'
    )
  }
 
  // inyecto el servicio
  constructor( private http: HttpClient ) { }
 
  // se que voy a devolver un arreglo de paises, pero como todavia no se bien como es
  // de momento retorno any
  buscarPais( termino: string): Observable<Country[]> { 
    const url = `${ this.apiUrl }/name/${termino}`;
    // no uso .subscribe() porque no quiero retornar la info. dentro del servicio
    // sino a quien quiera que mando a llamar a buscarPais
    return this.http.get<Country[]>(url, { params: this.httpParams});
  }

  // buscar por capital
  buscarCapital( termino: string): Observable<Country[]> { 
    const url = `${ this.apiUrl }/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams});
  }

  // obtener datos de un pa[is
  getPaisPorAlpha( id: string): Observable<Country> { 
    const url = `${ this.apiUrl }/alpha/${id}`;
    return this.http.get<Country>(url);
  }

  // paises por region
  getPaisPorRegion( region: string): Observable<Country[]> { 
    const url = `${ this.apiUrl }/region/${region}`;
    return this.http.get<Country[]>(url, { params: this.httpParams});
  }


 
}
