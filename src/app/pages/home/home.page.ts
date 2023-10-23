import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastOptions } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/User';
import { UserFormComponent } from '../user/user-form/user-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router
  ) {}

  public aboutUs(){
    this.router.navigate(['/about']);
  }

  public toUsers(){
    this.router.navigate(['/user']);
  }

}
