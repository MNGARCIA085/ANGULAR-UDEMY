import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interface';

 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private baseUrl: string = environment.baseUrl;
 
  private _usuario! : Usuario;
 
  get usuario(){
    return {...this._usuario}
  };
 
 
 
  constructor(private http:HttpClient) { }


  // login
  login(email:string, password:string){
    const url = `${this.baseUrl}/auth`;
    const body = {email,password};
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp => {
          console.log(resp);
          if (resp.ok){
            // guardo el token en el local storage
            localStorage.setItem('token',JSON.stringify(resp.token!)); // antes sin el JSON.stringify
            this._usuario = {
                  name: resp.name!,
                  uid: resp.uid!
            }
          }
        }),
        map( resp => resp.ok),
        // si no es v[alida la auth no da false ya que el backend devuelve un 404 y angular lo toma como eror
        // por eso pongo el cathcError
        catchError( error => of(error.error.msg)) // el of es para convertirlo en un observable
      )
  }


  // logout
  logout(){
    localStorage.clear();
    // si quisiera eliminar s[olo el token escribir[ia
    // localStorage.removeItem('token')
  }




  // validar el token
  validarToken(): Observable<boolean> {
    const url = `${ this.baseUrl }/auth/renew`;
    //const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '' );
    let headers = new HttpHeaders();
    //headers = headers.set('x-token',localStorage.getItem('token') || '');



    let token = localStorage.getItem('token') || '';
    

    const tok = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzU5YzEzYzY3OTVmMWQ2N2MzNTI0YjAiLCJuYW1lIjoiY3Vyc28gMyIsImlhdCI6MTY2NjkwMjY1MywiZXhwIjoxNjY2OTg5MDUzfQ.fUO90bCbqmE8BqoL-J1alFwzpbJEoEV754IrL7e6pzc';

    console.log('tok',typeof(tok));

    //token = token.replace(/["']/g, "");

    console.log(token,typeof(token));



    headers = headers.set('x-token', token);



    //headers = headers.set('x-token',
    //              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzU5YzEzYzY3OTVmMWQ2N2MzNTI0YjAiLCJuYW1lIjoiY3Vyc28gMyIsImlhdCI6MTY2NjkwMjY1MywiZXhwIjoxNjY2OTg5MDUzfQ.fUO90bCbqmE8BqoL-J1alFwzpbJEoEV754IrL7e6pzc');


    return this.http.get<AuthResponse>( url, { headers} )
        .pipe(
          map( resp => {
            localStorage.setItem('token', JSON.stringify(resp.token!) );
            this._usuario = {
              name: resp.name!,
              uid: resp.uid!,
            }
            console.log('respueta',resp);
            return resp.ok;
          }),
          //catchError( err => of(false) )
        );
  }

  // register
  registro(name:string,email:string, password:string){
    const url = `${this.baseUrl}/auth/new`;
    const body = {name,email,password};
    console.log('ver',body);
    return this.http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp => {
          console.log(resp);
          if (resp.ok){
            // guardo el token en el local storage
            localStorage.setItem('token',JSON.stringify(resp.token!));
            this._usuario = {
                  name: resp.name!,
                  uid: resp.uid!
            }
          }
        }),
        map( resp => resp.ok),
        // si no es v[alida la auth no da false ya que el backend devuelve un 404 y angular lo toma como eror
        // por eso pongo el cathcError
        catchError( error => of(error.error.msg)) // el of es para convertirlo en un observable
      )
  }




 
}
