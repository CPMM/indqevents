import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//Modulos propios
import { SharedModule } from '../shared/shared.module';

//Router
import { PAGES_ROUTER } from './pages.router';

// AGM-core
import { AgmCoreModule } from '@agm/core';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";


import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AddEventoComponent } from './add-evento/add-evento.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AddEventoComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PAGES_ROUTER,
    SharedModule,
    FormsModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCNo4HVxVlLxv6yMrkKeZPptH9zmhKkVBE'
    })
  ],
  exports:[
    HomeComponent,
    AddEventoComponent
  ]
})
export class PagesModule { }
