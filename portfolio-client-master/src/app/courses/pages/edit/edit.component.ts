import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Course } from '../../interfaces/courses.interfaces';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    _id:[],
    title: [],
    certificate: [],
    link: [],
    repo: this.fb.array([]),
    description: [],
    instructor: [],
    image: []
  })

  nuevoRepo: FormControl = this.fb.control('');

  get repoArr(){
    return this.miFormulario.get('repo') as FormArray;
  }

  constructor(private fb:FormBuilder,
              private courseService:CoursesService,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }


  course: Course[] = [];


  ngOnInit(): void {
      // obtengo los datos
      this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.courseService.getCourse(id))
      )
      .subscribe(course => {
              console.log(course);
              this.course = course;

              this.miFormulario.reset(
                {
                  _id:this.course[0]._id,
                  title:this.course[0].title,
                  certificate:this.course[0].certificate,
                  description:this.course[0].description,
                  instructor:this.course[0].instructor,
                  link:this.course[0].link,
                  image:this.course[0].image,
                  //repo:this.course[0].repo,
                }
              )


              this.course[0].repo.forEach(element =>
                this.repoArr.push(this.fb.control(element))
              )

            }  
          )

  }


  // save
  guardar(){
    let data: Course = this.miFormulario.value;
    // guardo los datos
    this.courseService.editCourse(data)
          .subscribe(resp => {
              console.log(resp);
              this.router.navigate(['/courses/list']);
          }
    )
  }

  // agregar repo
  agregarRepo(){
    // inserto
    this.repoArr.push(this.fb.control(this.nuevoRepo.value,Validators.required));
    // reseteo
    this.nuevoRepo.reset();
  }

  // eliminar repo
  eliminarRepo(i: number){
    this.repoArr.removeAt(i);
  }

}
