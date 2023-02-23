import { Injectable } from '@angular/core';
import {RoomList} from "../rooms";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  // Declaring a room list based on the RoomList interface
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
      photos: "Single.jpg",
      checkinTime: new Date('20-Feb-2023'),
      checkoutTime: new Date('28-Feb-2023'),
      rating: 2.6
    }
  ];

    constructor() {
      console.log("Rooms Service initialized");
    }

  /**
   * Gets a room list based on the RoomList interface
   */
  getRooms(): RoomList[] {
      return this.roomList;
  }
}
