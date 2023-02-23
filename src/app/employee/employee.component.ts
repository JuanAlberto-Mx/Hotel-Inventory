import {Component, OnInit} from '@angular/core';
import {RoomsService} from "../rooms/services/rooms.service";

@Component({
  selector: 'jahm-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService] // RoomsService local instance used
})
export class EmployeeComponent implements OnInit {

  employeeName: string = "Albert";

  constructor(private roomsService: RoomsService) {
  }

  ngOnInit(): void {
  }

}
