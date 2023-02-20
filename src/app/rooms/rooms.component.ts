import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jahm-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit{

  // Properties of the RoomsComponent class
  hotelName = "Holiday Inn";
  numberOfRooms = 103;

  // Properties to manage front-end elements
  hideRooms = false;
  toggleText = "Hide";

  constructor() {
  }

  /**
   * Method to change the visibility of the rooms
   * everytime a toggle button is pressed. In addition,
   * it updates the button text from "Show" to "Hide".
   */
  toggle() : void {
    this.hideRooms = !this.hideRooms;

    if (this.hideRooms)
      this.toggleText = "Show";
    else
      this.toggleText = "Hide";
  }

  ngOnInit(): void {
  }

}
