import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../../interfaces/courses.interfaces';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({
    title: ['sdfd'],
    certificate: ['sdfd'],
    link: ['ddsfdsfsf'],
    repo: this.fb.array([['nc']]),
    description: ['dfds'],
    instructor: ['dsfsf'],
    image: ['dsfdsfd']
  })

  nuevoRepo: FormControl = this.fb.control('');

  get repoArr(){
    return this.miFormulario.get('repo') as FormArray;
  }

  constructor(private fb:FormBuilder,
              private courseService:CoursesService,
              private router:Router) { }

  ngOnInit(): void {
  }

  guardar(){
    
  /**
   * if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched(); // para que se muestren los errores
      return
    }
   */


    let data: Course = this.miFormulario.value;

    // guardo los datos
    this.courseService.addCourse(data)
          .subscribe(resp => {
              console.log(resp);
              this.router.navigate(['/courses/list']);
          }
    )
    

    // reset
    //this.miFormulario.reset();

  }

  agregarRepo(){
    /**
    if (this.nuevoFavorito.invalid){
      return;
    }
    */
    // inserto
    this.repoArr.push(this.fb.control(this.nuevoRepo.value,Validators.required));
    // reseteo
    this.nuevoRepo.reset();
  }


  eliminarRepo(i: number){
    this.repoArr.removeAt(i);
  }

}
