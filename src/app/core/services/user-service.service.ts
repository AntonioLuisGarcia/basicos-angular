import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../interfaces/User';
import { ExceptionCode } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  id:number = 4;//porque tenemos 4 usuarios hasta ahora
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private users:User[] = [
    {id:1, name:"Antonio Luis", surname:"García Guerrero",age:18},
    {id:2, name:"Daniel", surname:"Luque Gallardo",age:19},
    {id:3, name:"Jose", surname:"Perez Perez",age:30},
    {id:4, name:"Kiko", surname:"Rivera",age:39},
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

  createUser(user:User):Observable<User>{
    return new Observable(observer =>{
      var _users = [...this._users.value];
      user.id = ++this.id;
      _users.push(user);
      this._users.next(_users);
      observer.next(user);
    })
  }
}
