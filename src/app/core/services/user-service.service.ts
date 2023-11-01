import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../interfaces/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  id:number = 4;//porque tenemos 4 usuarios hasta ahora
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$:Observable<User[]> = this._users.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  getAll():Observable<User[]>{
    // Sin json server
    // this._users.next(this.users);
    // return this._users.asObservable();
      return this.http.get<User[]>(environment.apiUrl+'/users').pipe(tap((users:any[])=>{
      this._users.next(users);}));
  }

  updateUser(user:User):Observable<User>{
    return new Observable (observer => {
      this.http.patch<User>(environment.apiUrl+`/users/${user.id}`,user).subscribe(_=>{
        this.getAll().subscribe(_=>{
          this.getUser(user.id).subscribe(_user=>{
            observer.next(_user);
          })
        })
      })
    })
  }


  public getUser(id:number):Observable<User>{
    return this.http.get<User>(environment.apiUrl+`/users/${id}`);
  }
  /*
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
  */
  
  deleteUser(user:User): Observable<User>{
    return new Observable (observer =>{
      this.http.delete<User>(environment.apiUrl + `/users/${user.id}`).subscribe(_=>{
        this.getAll().subscribe(_=>{
          observer.next(user);
        })
      })
    })
  }

  /*
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
  */
  createUser(user:User):Observable<User>{
    var _user: any = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      age: user.age
    }
    return this.http.post<User>(environment.apiUrl+"/users",_user).pipe(tap(_=>{
      this.getAll().subscribe();
    }))
  }
  /*
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
  */


  public query(q:string):Observable<User[]>{
    return this.http.get<User[]>(environment.apiUrl+'/users?q='+q);
  }
}
