import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent  implements OnInit {
  form:FormGroup;
  mode:'New'|'Edit' = 'New';
  @Input() set user(_user:User){
    if(_user){
      this.mode = 'Edit';
      this.form.controls['name'].setValue(_user.name);
      this.form.controls['surname'].setValue(_user.surname);
      this.form.controls['age'].setValue(_user.age);
    }
  }
  constructor(
    private _modal:ModalController,
    private formBuilder:FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      age:[0, [Validators.required]]
    })
  }

  ngOnInit() {}

}
