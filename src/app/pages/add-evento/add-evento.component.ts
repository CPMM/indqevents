import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';
import { MouseEvent } from '@agm/core';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import * as moment from 'moment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.css']
})
export class AddEventoComponent implements OnInit {

  public evento: Evento;
  public hoy: any;

  //------------------------------------------------Imagen
  public imgSubir: File;
  public imgTemp: string;
  public subiendo: Boolean;


  //-------------------------------------------------MAP
  // Google map zoom
  public zoom: number = 13;
  // centro de incio del mapa
  public lat: number = 25.767190;
  public lng: number = -108.992280;
  public label: string = '';
  public place: string = 'IndQ';
  public marker: Marker = { //Datos del marcador
    lat: 25.767190,
    lng: -108.992280,
    label: '',
    draggable: true
  };



  constructor(
    private _evento: EventoService,
    private _router:Router
  ) {
    this.evento = new Evento('', '', '', '', '', 0, false, [0, 0]);
    // this.marcador = { lat: 0, lng: 0, draggable: true, label: '' };
  }

  ngOnInit() {
    this.hoy = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log(this.hoy)

  }

  guardar() {
    let date = moment(this.evento.date).format('YYYY-MM-DD hh:mm:ss');
    if(moment(this.hoy).diff(date,'hours')>=1){
      swal.fire({
        title: "Error!",
        text: "La fecha del evento no debe ser menor al día ni hora actual!",
        type: "error",
      });
      return;
    }
    this.evento.location = [this.marker.lng, this.marker.lat];
    this._evento.addEvento(this.evento).subscribe(
      res => {
        swal.fire({
          title: "Correcto!",
          text: "Evento registrado correctamente",
          type: "success",
        });
        this.evento = new Evento('', '', '', '', '', 0, false, [0, 0]);
        this._router.navigate(['/home']);
        this.imgTemp = '';
      },
      err => {
        console.log(err);
        swal.fire({
          title: "Error!",
          text: err.error,
          type: "error",
        });
      }
    )
  }

  subirImg() {
    this.subiendo=true;
    this._evento.addImg(this.imgSubir).subscribe(
      res => {
        this.evento.image = res['fileName'];
        swal.fire({
          title: "Correcto!",
          text: 'Imagen guardada',
          type: 'success'
        });
        this.subiendo = false;
      },
      err => {
        console.log(err);
        swal.fire({
          title: "Error!",
          text: err.error,
          type: "error",
        });
        this.subiendo=false
      }
    );
  }

  quitarImg(){
    this.subiendo = false;
    this.imgTemp='';
    this.evento.image='';
    swal.fire({
      title: "Correcto!",
      text: "Imagen removida!",
      type: "success",
    });
  }


  seleccioarImagen(archivo: File) {
    if (!archivo) {
      this.imgSubir = null;
      return;
    }
    //Validar que sea una imagen
    if (archivo.type.indexOf('image') < 0) {
      alert('Solo imagenes');
      this.imgSubir = null;
      return;
    }
    console.log(archivo);
    let validos = ["image/jpeg", 'image/png', 'image/jpg']
    if (validos.indexOf(archivo.type) < 0) {
      alert("Solo se permiten imagenes jpeg, jpg y png");
      return;
    }
    //Generamos la url de la imagen seleccionada
    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imgTemp = String(reader.result);
    }
    //Guardamos en imgSubir el archivo que se subira
    this.imgSubir = archivo;
  }


  mapClicked($event: MouseEvent) {
    this.marker = {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    };
  }

  markerDragEnd($event: MouseEvent) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
  }

  @ViewChild("placesRef", { read: '', static: false }) placesRef: GooglePlaceDirective;
  public handleAddressChange(address: Address) {
    this.lat = address.geometry.location.lat();
    this.lng = address.geometry.location.lng();
    this.place = address.formatted_address;
    this.zoom = 15;
    this.changeZoom({});
  }


  public changeZoom(e) {
    this.marker = {
      lat: this.lat,
      lng: this.lng,
      place: this.place,
      label: '',
      draggable: true
    };

  }


  public async cancelar(){
    swal.fire({
      title: "Cancelar?",
      text: "Si continúa con la navegación perderá lo capturado. ¿Desea continuar?",
      showCancelButton: true
    }).then(ok=>{
      if(ok.value){
        this._router.navigate(['/home']);
      }
    })
  }


}

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  place?: string;
  draggable: boolean;
}