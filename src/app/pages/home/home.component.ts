import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { EventoService } from '../../services/evento.service';
import swal from 'sweetalert2';
import { Evento } from '../../models/evento';
import { GLOBAL } from '../../app.global';
import { FiltroEvento } from '../../models/filroEvento';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
declare const $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public url = GLOBAL.ulrServer;

  public usuario;
  public eventos:Evento[];
  public paginaActual:number;
  public paginas:number[];

  public cargando:boolean;

  //Filtros:
  public filtros:FiltroEvento

  constructor(
    private _usuario:UsuarioService,
    private _evento:EventoService
  ) { 
    this.filtros = new FiltroEvento(1,null,null,null);
    this.cargando = false;
  }

  ngOnInit() {
    this.usuario = this._usuario.getUsuarioLog();
    this._evento.getEventosSocket().subscribe(
      res=>{
        this.eventos.map(e=>{
          if(e.id==res.id){
            e.attendances = res.attendances;
          }
        });
      }
    )
    this.getEventos();
  }

  getEventos(){
    this.cargando= true;
    this._evento.getEventos(this.filtros).subscribe(
      res=>{
        this.eventos = res['items'];
        this.paginaActual = res['page'];
        this.paginas = Array.from({length: res['pages']}, (x,i) => i);
        this.cargando=false;
      },
      err=>{
        console.log(err);
        this.cargando=false
        swal.fire({
          title:'Error!',
          text:err.error,
          type:'error'
        });
      }
    )
  }

  asistire(eventId){
    this._evento.asistire(eventId).subscribe(
      res=>{
        this.eventos.map(e=>{
          if(e.id==eventId){
            e.willYouAttend = true;
          }
        });
        swal.fire({
          title:'Correcto!',
          text:'Asistencia marcada',
          type:'success'
        });
      },
      err=>{
        console.log(err);
        swal.fire({
          title:'Error!',
          text:err.error,
          type:'error'
        })
      }
    )
  }

  desAsistire(eventId){
    this._evento.desasistire(eventId).subscribe(
      res=>{
        this.eventos.map(e=>{
          if(e.id==eventId){
            e.willYouAttend = false;
          }
        });
        swal.fire({
          title:'Correcto!',
          text:'Asistencia marcada',
          type:'success'
        });
      },
      err=>{
        console.log(err);
        swal.fire({
          title:'Error!',
          text:err.error,
          type:'error'
        })
      }
    )
  }

  @ViewChild("placesRef", { read: '', static: false }) placesRef: GooglePlaceDirective;
  public handleAddressChange(address: Address) {
    this.filtros.lat = address.geometry.location.lat();
    this.filtros.lng = address.geometry.location.lng();
    this.getEventos();
  }

  cambiarPagina(p){
    this.filtros.page=p+1 ;
    this.getEventos()
  }

  quitarFiltros(filtro){
    if(filtro === 'dir'){
      this.filtros.lat = null;
      this.filtros.lng = null;
      document.getElementById("places")['value']='';
    }else {
      this.filtros[filtro] = null;
    }
    this.getEventos();
  }

}
