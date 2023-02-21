import {Component, OnInit} from '@angular/core';
import {Room, RoomList} from "./rooms";

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

  // Implementation of a room based on the Room interface
  rooms: Room = {
    totalRooms: 103,
    availableRooms: 47,
    bookedRooms: 56
  };

  // Implementation of a room list based on the RoomList interface
  roomList: RoomList[] = [
    {
      roomNumber: 102,
      roomType:"King-Double",
      amenities:"Air conditioner, Coffee, Free Wi-Fi, TV, Bathroom",
      price: 1500,
      photos: "king-double.jpg",
      checkinTime: new Date('01-Feb-2023'),
      checkoutTime: new Date('20-Feb-2023'),
      rating: 4.5
    },
    {
      roomNumber: 232,
      roomType:"Junior Suite",
      amenities:"Air conditioner, Coffee, Free Wi-Fi, TV, Bathroom, Kitchen",
      price: 2000,
      photos: "JuniorSuite.jpg",
      checkinTime: new Date('20-Feb-2023'),
      checkoutTime: new Date('10-Mar-2023'),
      rating: 5.0
    },
    {
      roomNumber: 301,
      roomType:"Single",
      amenities:"Air conditioner, Free Wi-Fi, TV, Bathroom",
      price: 2000,
      photos: "JuniorSuite.jpg",
      checkinTime: new Date('20-Feb-2023'),
      checkoutTime: new Date('28-Feb-2023'),
      rating: 2.6
    }
  ]

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
