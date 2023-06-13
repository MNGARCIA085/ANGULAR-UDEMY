import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of, tap , map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined;

  get auth(): Auth{
    // {... } es para asegurarme de no cambiarlo
    return {...this._auth!};
  }

  private baseUrl:string = environment.baseUrl;

  constructor(private http:HttpClient) { }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
              .pipe(
                tap(auth => this._auth=auth),
                tap(auth => localStorage.setItem('id',auth.id))
              );
  }

  logout(){
    this._auth = undefined;
  }

  verificarAutenticacion(): Observable<boolean> {

    // si no hay id en el local storage es porque no está logueado
    if (!localStorage.getItem('id')){
      return of(false); // uso of porque debo devolver un observable
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map( auth => {
          this._auth = auth;
          return true; // acá no hace falta el of porque ya es un observable
        })
      )



  }


}
