import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages/add/add.component';
import { DetailComponent } from './pages/detail/detail.component';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path:'list',
    component: ListComponent
  },
  {
    path:'add',
    component: AddComponent
  },
  {
    path:'detail/:id',
    component:DetailComponent
  },
  {
    path:'edit/:id',
    component:EditComponent
  },
  {
    path:'**',
    redirectTo:'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
