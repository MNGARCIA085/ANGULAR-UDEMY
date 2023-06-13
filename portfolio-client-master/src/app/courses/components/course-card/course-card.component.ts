import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../interfaces/courses.interfaces';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styles: [`
  imgs {
    height: 50px;
    width: 50px;
  }
  `]
})
export class CourseCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() course!:Course;

}
