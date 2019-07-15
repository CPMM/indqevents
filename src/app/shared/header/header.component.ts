import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public usuario;

  constructor(
    private _router:Router,
    private _usuario:UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuario.getUsuarioLog();
  }

  public salir(){
    this._usuario.logout();
    this._router.navigate(['/login']);
  }


}
