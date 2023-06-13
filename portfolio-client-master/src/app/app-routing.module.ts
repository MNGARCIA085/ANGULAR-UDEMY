import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'courses', 
    loadChildren: () => import ('./courses/courses.module').then(m => m.CoursesModule),
  },
  { 
    path: 'about', 
    loadChildren: () => import ('./about/about.module').then(m => m.AboutModule),
  },
  {
    path:'**',
    redirectTo:'courses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
