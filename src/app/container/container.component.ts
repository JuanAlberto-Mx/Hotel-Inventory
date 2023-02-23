import {AfterContentInit, Component, ContentChild, Host, OnInit} from '@angular/core';
import {EmployeeComponent} from "../employee/employee.component";
import {RoomsService} from "../rooms/services/rooms.service";

@Component({
  selector: 'jahm-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(EmployeeComponent) employeeContentChild!: EmployeeComponent;

  /**
   * Constructor with dependency injection.
   * Use of @Host decorator to use a second instance of the service.
   * @param roomsService
   */
  constructor(@Host() private roomsService: RoomsService) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.employeeContentChild.employeeName = "John Albert";
  }

}
