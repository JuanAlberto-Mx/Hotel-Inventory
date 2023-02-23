import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit, QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import {Room, RoomList} from "./rooms";
import {HeaderComponent} from "../header/header.component";
import {RoomsService} from "./services/rooms.service";

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

  /**
   * Constructor with RoomsService injection dependency.
   * RoomsService global instance used.
   * @param roomsService the instance of RoomsService service.
   */
  constructor(private roomsService: RoomsService) {
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
    // Initialization of the room list getting the information from RoomsService.
    this.roomList = this.roomsService.getRooms();
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
