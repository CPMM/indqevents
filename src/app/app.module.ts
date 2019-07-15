import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { APP_ROUTER } from './app.router';

// Modulos propios
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

// AGM-core
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { AddEventoComponent } from './pages/add-evento/add-evento.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTER,
    FormsModule,
    HttpClientModule,
    SharedModule,
    PagesModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCNo4HVxVlLxv6yMrkKeZPptH9zmhKkVBE'
    })
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
