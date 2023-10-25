import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/User';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {


  @Input() user:User | undefined;

  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked:EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onCardClick(){
    this.onCardClicked.emit();
  }

  onDeleteClick(event:any){
    this.onDeleteClicked.emit();
    event.stopPropagation();
  }

}
