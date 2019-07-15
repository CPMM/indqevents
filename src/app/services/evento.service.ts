import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { GLOBAL } from '../app.global';
import { Evento } from '../models/evento';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';
import { FiltroEvento } from '../models/filroEvento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private url: String = GLOBAL.ulrServer;
  private socket;

  constructor(
    private _http: HttpClient,
    private _usuario: UsuarioService
  ) {
    this.socket = io(this.url);
  }

  addEvento(evento: Evento) {
    let token = this._usuario.getToken();
    let headers = new HttpHeaders({
      'Authorization': token
    });
    return this._http.post(this.url + 'events', evento, { headers });
  }

  addImg(image: File) {
    let token = this._usuario.getToken();
    let headers = new HttpHeaders({
      'Authorization': token
    });
    let form: FormData = new FormData();
    form.append('file', image, image.name);
    return this._http.post(`${this.url}images`, form, { headers });
  }

  getEventosSocket() {
    return Observable.create((observer) => {
      this.socket.on('events', (message) => {
        observer.next(message);
      });
    });
  }

  getEventos(filtros?: FiltroEvento) {
    let token = this._usuario.getToken();
    let headers = new HttpHeaders({
      'Authorization': token
    });

    let { page, title, lat, lng } = filtros;
    let newUrl = `${this.url}events?page=${page}`;
    if (title) newUrl += `&title=${title}`;
    if (lat) newUrl += `&lat=${lat}`;
    if (lng) newUrl += `&lng=${lng}`;
    newUrl = encodeURI(newUrl);
    console.log(newUrl);
    return this._http.get(newUrl, { headers });
  }

  asistire(eventId: string) {
    let token = this._usuario.getToken();
    let headers = new HttpHeaders({
      'Authorization': token
    });
    return this._http.post(`${this.url}events/attendance/${eventId}`, {}, { headers });
  }

  desasistire(eventId: string) {
    let token = this._usuario.getToken();
    let headers = new HttpHeaders({
      'Authorization': token
    });
    return this._http.delete(`${this.url}events/attendance/${eventId}`, { headers });
  }
}


