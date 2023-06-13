import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required,Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['death note',Validators.required],
      ['spx x family',Validators.required]
    ], Validators.required)
  })


  nuevoFavorito: FormControl = this.fb.control('',Validators.required);


  get favoritosArr(){
    return this.miFormulario.get('favoritos') as FormArray;
  }


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched
  }


  guardar(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); // para que se muestren los errores
      return
    }
    // aquí teóricamente debería guardar los datos ...
    // reset
    this.miFormulario.reset();
  }


  agregarFavorito(){
    if (this.nuevoFavorito.invalid){
      return;
    }

    // inserto
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value,Validators.required));

    // reseteo
    this.nuevoFavorito.reset();

  }


  eliminar(i: number){
    this.favoritosArr.removeAt(i);
  }


}
