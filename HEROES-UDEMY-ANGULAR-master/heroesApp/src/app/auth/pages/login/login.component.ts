import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    // TODO: chequear contra el backend

    // consumo el servicio
    this.authService.login()
        .subscribe(resp => {
          console.log(resp); // deber[ian ser los datos del usuario
          // si tiene id navego a la pantalla principal
          if (resp.id){
            this.router.navigate(['./heroes']);
          }
        })

  }

}
