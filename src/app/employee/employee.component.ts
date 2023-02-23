import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jahm-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employeeName: string = "Albert";

  constructor() {
  }

  ngOnInit(): void {
  }

}
