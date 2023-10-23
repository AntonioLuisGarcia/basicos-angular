import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

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
    var index = this.users.findIndex(u => u.id = user.id);

    if(index > 0){
      this.users[index] = user;
      this._users.next(this.users);
      return of(user);
    }else{
      return throwError("Usuario no encontrado");
    }
  
  }
}
