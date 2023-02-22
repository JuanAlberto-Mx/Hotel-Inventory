import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit, QueryList,
  SimpleChanges,
  ViewChild, ViewChildren
} from '@angular/core';
import {Room, RoomList} from "./rooms";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'jahm-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

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

  // Declaring a room list based on the RoomList interface
  roomList: RoomList[] = [];

  // Property to set the room selected by te user
  selectedRoom!: RoomList;

  // Property to set the title of the rooms list
  title: string = "Room list";

  //
  /**
   * Create a new instance of HeaderComponent to access it from this RoomsComponent class.
   * This options allows viewing just the first instance in case of multiple instances.
   */
  @ViewChild(HeaderComponent) headerChildComponent!: HeaderComponent;

  /**
   * Create a new instance of HeaderComponent to access it from this RoomsComponent class.
   * This options allows viewing all the instances in case of multiple instances.
   */
  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  constructor() {
  }

  /**
   * Method to change the visibility of the rooms
   * everytime a toggle button is pressed. In addition,
   * it updates the button text from "Show" to "Hide".
   */
  toggle() : void {
    this.title = "Room list";
    this.hideRooms = !this.hideRooms;

    if (this.hideRooms)
      this.toggleText = "Show";
    else
      this.toggleText = "Hide";
  }

  ngOnInit(): void {
    // Initialization of a room list based on the RoomList interface
    this.roomList = [
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
  }

  ngDoCheck(): void {
    console.log('OnChanges is called');
  }

  ngAfterViewInit(): void {
    this.headerChildComponent.title = "Rooms View";
    this.headerChildrenComponent.last.title = "Last item";
  }

  ngAfterViewChecked(): void {

  }

  /**
   * Method to determine the room selected by the user.
   * @param room the selected room.
   */
  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  /**
   * Add a new room to the inventory.
   */
  addRoom() : void {
    const room: RoomList = {
      roomNumber: 302,
      roomType:"Single",
      amenities:"Air conditioner, Free Wi-Fi, TV, Bathroom",
      price: 2100,
      photos: "Single.jpg",
      checkinTime: new Date('23-Feb-2023'),
      checkoutTime: new Date('24-Feb-2023'),
      rating: 3.3
    };

    // Preserve the original list and add a new element ah the end
    this.roomList = [...this.roomList, room];
  }
}
