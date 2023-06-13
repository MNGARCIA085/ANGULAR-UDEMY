import { Component, OnInit } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { Course } from '../../interfaces/courses.interfaces';
import { CoursesService } from '../../services/courses.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  //termino: string = '';
  courses: Course[] = [];
  filteredCourses: Course[] = [];


  private readonly searchSubject = new Subject<string | undefined>();


  public onSearchQueryInput(event: Event): void {
    const searchQuery = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchQuery?.trim());
  }

  




  constructor(private coursesService: CoursesService) { }


  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(resp => this.filteredCourses = resp);

    this.searchSubject
    .pipe(
      debounceTime(100),
      switchMap((searchQuery) => this.coursesService.getCourses(searchQuery))
    )
    .subscribe((results) => (this.filteredCourses = results));


  }

  /**
  buscar(){
    this.coursesService.getCourses(this.termino)
        .subscribe(resp => {
                      this.filteredCourses = resp;
                    }
        );
  }
  */




}
