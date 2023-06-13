import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,Validators.minLength(3)]],
    precio: [0, [Validators.required, Validators.min(0)]],
    existencias: [0, [Validators.required, Validators.min(0)]]
  })

  constructor(private fb:FormBuilder) { }


  ngOnInit(): void {
    // valores iniciales del form; los que yo quiera
    this.miFormulario.reset({
      nombre:'algo',
      precio:12
    })
  }


  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }


  guardar(){

    console.log('valores',this.miFormulario.value);

    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); // para que se muestren los errores
      return
    }

    // aquí teóricamente debería guardar los datos ...

    // reset
    this.miFormulario.reset();

  }

  



}
