import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  

  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.pattern(this.validationService.nombreApellidoPattern)]],
    email: ['',[Validators.required, Validators.pattern(this.validationService.emailPattern)],[ this.emailValidator ] ],
    username: ['',[Validators.required, this.validationService.noPuedeSerStrider]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    password2: ['', [Validators.required, Validators.minLength(4)]],
    }, {
      validators: [this.validationService.camposIguales('password','password2')]
    }
  )

  constructor(private fb: FormBuilder,
              private validationService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  campoNoValido(campo: string){
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }


  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'Email es obligatorio';
    } else if ( errors?.['pattern'] ) {
      return 'El valor ingresado no tiene formato de correo';
    } else if ( errors?.['emailTomado'] ) {
      return 'El email ya fue tomado';
    }

    return '';
  }



  ngOnInit(): void {
  }


  submitFormulario(){
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }

}
