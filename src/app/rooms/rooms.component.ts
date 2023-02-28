import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit, QueryList, SkipSelf,
  ViewChild, ViewChildren
} from '@angular/core';
import {Room, RoomList} from "./rooms";
import {HeaderComponent} from "../header/header.component";
import {RoomsService} from "./services/rooms.service";
import {Observable} from "rxjs";

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

  // Properties to set the title buttons
  showButton = "Show";
  addButton = "Add room"
  updateButton = "Edit room";
  deleteButton = "Delete room";

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
  roomListTitle: string = "Room list";

  /**
   * Observable property that allow other components to subscribe.
   */
  stream  = new Observable(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
  });

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
  constructor(@SkipSelf() private roomsService: RoomsService) {
  }

  /**
   * Method to change the visibility of the rooms
   * everytime a toggle button is pressed. In addition,
   * it updates the button text from "Show" to "Hide".
   */
  toggle() : void {
    this.roomListTitle = "Room list";
    this.hideRooms = !this.hideRooms;

    if (this.hideRooms)
      this.showButton = "Hide";
    else
      this.showButton = "Show";
  }

  ngOnInit(): void {
    // Printing the values of the stream after its initialization
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete'),
      error: () => console.log('Error')
    });

    // Initialization of the stream to subscribe other elements
    this.stream.subscribe((data) => console.log(data));

    // Initialization of the room list getting the information from HTTP.
    this.roomsService.getRooms().subscribe(rooms => {
      this.roomList = rooms;
    })
  }

  ngDoCheck(): void {
    console.log('OnChanges is called');
  }

  ngAfterViewInit(): void {
    this.headerChildComponent.headerTitle = "Rooms View";
    this.headerChildrenComponent.last.headerTitle = "Last item";
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
  addRoom() {
    const room: RoomList = {
      roomType:"Single",
      amenities:"Air conditioner, Free Wi-Fi, TV, Bathroom",
      price: 2100,
      photos: "Single.jpg",
      checkinTime: new Date('23-Feb-2023'),
      checkoutTime: new Date('24-Feb-2023'),
      rating: 3.3
    };

    // Send the room to the method which connects the API
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: "cef2da3e-8470-4351-bdf1-9345ab10dd73",
      roomType:"Gran Suite",
      amenities:"Air conditioner, Free Wi-Fi, TV, PlayStation 6, Bar, Coffee, Bathroom, Jacuzzi",
      price: 5000,
      photos: "GranSuite.jpg",
      checkinTime: new Date('27-Feb-2023'),
      checkoutTime: new Date('28-Feb-2023'),
      rating: 5.0
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom("cef2da3e-8470-4351-bdf1-9345ab10dd73").subscribe((data) => {
      this.roomList = data;
    });
  }
}
