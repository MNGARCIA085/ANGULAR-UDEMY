import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PorCapitalComponent } from "./pais/pages/por-capital/por-capital.component";
import { PorPaisComponent } from "./pais/pages/por-pais/por-pais.component";
import { PorRegionComponent } from "./pais/pages/por-region/por-region.component";
import { VerPaisComponent } from "./pais/pages/ver-pais/ver-pais.component";
 
 
// rutas principales de la app
const routes: Routes = [
    // ruta principal, que va a mostrar la búsqueda por país
    {
        path:'', 
        component: PorPaisComponent,
        pathMatch:'full'
    },
    // por región
    {
        path:'region', 
        component: PorRegionComponent,
    },
    // por capital
    {
        path:'capital', 
        component: PorCapitalComponent,
    },
    // buscar un país en particular
    {
        path:'pais/:id',  
        component: VerPaisComponent,
    },
    // si el usuario no ingresa a las rutas de arriba redirecciono a cierta ruta
    // o muestro un componente
    {
        path:'**',  
        //component: 404Component,
        redirectTo:''
    },
] 
 
@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {}