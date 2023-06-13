import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Course } from '../../interfaces/courses.interfaces';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


  course: Course[] = [];

  title:string = '';
  description:string = '';
  certificate:string = '';
  link:string = '';
  instructor:string = '';
  repo:string[] = [];
  // image URL
  image:string = '';



  constructor(private activatedRoute: ActivatedRoute,
              private courseService: CoursesService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.courseService.getCourse(id))
      )
      .subscribe(course => {
              console.log(course);
              this.course = course;
              this.title = course[0].title;
              this.instructor = course[0].instructor;
              this.description = course[0].description;
              this.link = course[0].link;
              this.certificate = course[0].certificate;
              this.repo = course[0].repo;
              this.image = course[0].image;
            }  
          )
  }

}
