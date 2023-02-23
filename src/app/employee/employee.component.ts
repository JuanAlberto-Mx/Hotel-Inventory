import {Component, OnInit, Self} from '@angular/core';
import {RoomsService} from "../rooms/services/rooms.service";

@Component({
  selector: 'jahm-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService] // RoomsService local instance used
})
export class EmployeeComponent implements OnInit {

  employeeName: string = "Albert";

  /**
   * Constructor with RoomsService dependency injection and a @Self decorator.
   * The service must be available. Otherwise, an exception is thrown.
   * @param roomsService
   */
  constructor(@Self() private roomsService: RoomsService) {
  }

  ngOnInit(): void {
  }

}
