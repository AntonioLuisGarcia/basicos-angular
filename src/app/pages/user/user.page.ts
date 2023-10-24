import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/User';
import { UserServiceService } from 'src/app/core/services/user-service.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  users:User[] | undefined;

  constructor(
    private router: Router,
    private userService:UserServiceService,
    private modal: ModalController

  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      users => {
        this.users = users;
      }
    );
  }

  public home(){
    this.router.navigate(['/home']);
  }

  public onDeleteClicked(user: User){
    var _user:User = {...user};

    this.userService.deleteUser(_user).subscribe(
        {next: user=>{
        }
      });
  }

  public async onCardClicked(user:User){
    
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          this.userService.updateUser(info.data).subscribe(async user=>{
          })
        }
        
        break;
        case 'delete':{
          this.userService.deleteUser(info.data).subscribe(async user=>{
        })
        }
        
        break;
        
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(user, onDismiss);
  }

  async presentForm(data:User|null, onDismiss:(result:any)=>void){
    
    const modal = await this.modal.create({
      component:UserFormComponent,
      componentProps:{
        user:data
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result);
      }
    });
  }

  onNewUser(){
    var onDismiss = (info:any)=>{
      console.log(info);
      switch(info.role){
        case 'ok':{
          this.userService.createUser(info.data).subscribe(async user=>{
          })
        }
        break;
        default:{
          console.error("No debería entrar");
        }
      }
    }
    this.presentForm(null, onDismiss);
  }

}
