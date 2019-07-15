import { Routes, RouterModule } from '@angular/router';

//Guards
import { LogueadoGuard } from '../guards/logueado.guard';

//Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AddEventoComponent } from './add-evento/add-evento.component';

const PagesRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent, 
        canActivate:[LogueadoGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent},
            { path: 'addevent', component: AddEventoComponent }
        ]
    },
]

export const PAGES_ROUTER = RouterModule.forChild(PagesRoutes);