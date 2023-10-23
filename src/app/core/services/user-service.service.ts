import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private users:User[] = [
    {name:"Antonio Luis", surname:"García Guerrero",age:18},
    {name:"Daniel", surname:"Luque Gallardo",age:19},
    {name:"Jose", surname:"Perez Perez",age:30},
    {name:"Kiko", surname:"Rivera",age:39},
  ];

  constructor() { }

  getAll():Observable<User[]>{
    this._users.next(this.users);
    return this._users.asObservable();
  }
}
