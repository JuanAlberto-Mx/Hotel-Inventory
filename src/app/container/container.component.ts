import {AfterContentInit, Component, ContentChild, Host, OnInit} from '@angular/core';
import {EmployeeComponent} from "../employee/employee.component";
import {RoomsService} from "../rooms/services/rooms.service";

@Component({
  selector: 'jahm-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(EmployeeComponent) employeeContentChild!: EmployeeComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.employeeContentChild.employeeName = "John Albert";
  }

}
