import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../interfaces/User';
import { ExceptionCode } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private users:User[] = [
    {id:0, name:"Antonio Luis", surname:"García Guerrero",age:18},
    {id:1, name:"Daniel", surname:"Luque Gallardo",age:19},
    {id:2, name:"Jose", surname:"Perez Perez",age:30},
    {id:3, name:"Kiko", surname:"Rivera",age:39},
  ];

  constructor() { }

  getAll():Observable<User[]>{
    this._users.next(this.users);
    return this._users.asObservable();
  }

  updateUser(user:User):Observable<User>{
    var users = [...this._users.value]
    var index = users.findIndex(u => u.id == user.id);

    if(index >= 0){
      this.users[index] = user;
      this._users.next(this.users);
      return of(user);
    }else{
      return throwError("Usuario no encontrado");
    }
  }

  getUser(user:User):Observable<User>{
    return new Observable(observer=>{
    var _user = this._users.value.findIndex(u => u.id = user.id)
    if(_user){
      observer.next(user)  
    }else{
      observer.error(console.log("Error en getUser"))
    }
  })
  }

  deleteUser(user:User):Observable<User>{
    return new Observable(observer=>{
      var _user = [...this._users.value];
      var index = _user.findIndex(u => u.id == user.id);
      if(index>=0){
        _user =[..._user.slice(0,index), ..._user.slice(index+1)]
        this._users.next(_user);
          observer.next(user);
      }else{
        observer.error("No se ha podido encontrar");
      }
      observer.complete();
    })
  }
}
