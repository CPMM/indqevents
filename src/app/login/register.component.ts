import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
declare const $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public nuevoUsuario:User
  public confirmarPwd:string;

  constructor(
    private _usuario:UsuarioService,
    private _router:Router
  ) { 
    this.nuevoUsuario = new User('','','','','');
  }

  ngOnInit() {
  }

  registrar(){
    this._usuario.addUser(this.nuevoUsuario).subscribe(
      res=>{
        console.log(res);
        swal.fire({
          title:'Correcto!',
          text:'',
          type:'success'
        });
        this._router.navigate(['/login']);
      },
      err=>{
        console.log(err);
        alert(err.error);
      }
    )
  } 

}
