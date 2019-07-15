import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public dataLogin:DataLogin;

  constructor(
    private _usuario:UsuarioService,
    private _router:Router
  ) { 
    this.dataLogin = {email:'', password:''};
  }

  ngOnInit() {
    if(this._usuario.getUsuarioLog()){
      this._router.navigate(['/home']);
    }
  }

  public entrar(){
    this._usuario.login(this.dataLogin).subscribe(
      res=>{
        console.log(res);
        swal.fire({
          title:'Bienvenido',
          timer: 500,
          showConfirmButton:false
        });
        //Se guardara al usuario logueado en localstorage
        this._usuario.setUserLog(res);
        this._router.navigate(['/home']);
      },
      err=>{
        console.log(err);
        swal.fire({
          text:err.error
        })
      }
    )
  }

}

interface DataLogin{
  email:string,
  password:string
}
