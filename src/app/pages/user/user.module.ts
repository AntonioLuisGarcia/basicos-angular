import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    SharedModule
  ],
  declarations: 
  [UserPage,
  UserInfoComponent, 
  UserFormComponent]
})
export class UserPageModule {}
