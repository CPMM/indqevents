import { Routes,  RouterModule } from '@angular/router';

// COMPONENTES
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { NoLogueadoGuard } from './guards/no-logueado.guard';

const AppRoutes:Routes = [
    { path:'login', component:LoginComponent, canActivate:[NoLogueadoGuard]},
    { path:'register', component:RegisterComponent, canActivate:[NoLogueadoGuard] },
    { path: '**', component: NotfoundComponent },
]

export const APP_ROUTER = RouterModule.forRoot(AppRoutes, { useHash:true });