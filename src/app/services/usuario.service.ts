import { Injectable } from '@angular/core';
import { GLOBAL } from '../app.global';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string = GLOBAL.ulrServer + 'users/' ;
  constructor(
    private _http:HttpClient
  ) { }

  public addUser(user:User){
    let headers:HttpHeaders = new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this._http.post(this.url, user);
  }

  public login(user){
    if(!user.email || !user.password) return 
    return this._http.post(`${this.url}login`, user);
  }

  //Metodos para guardar al usuario en localstorage
  public setUserLog(user){
    let data = JSON.stringify(user);
    localStorage.setItem('log', data);
  }

  public getUsuarioLog(){
    let data = JSON.parse(localStorage.getItem('log'));
    if(data != null) return data;
    else return false;
  }

  public getToken(){
    let data = JSON.parse(localStorage.getItem('log')).token;
    if(data != null) return data;
    else return false;
  }
  
  public logout(){
    localStorage.clear();
  }
}


