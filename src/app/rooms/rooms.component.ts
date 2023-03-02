import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck, OnDestroy,
  OnInit, QueryList, SkipSelf,
  ViewChild, ViewChildren
} from '@angular/core';
import {Room, RoomList} from "./rooms";
import {HeaderComponent} from "../header/header.component";
import {RoomsService} from "./services/rooms.service";
import {catchError, map, Observable, of, Subject, Subscription} from "rxjs";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'jahm-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy {

  // Properties of the RoomsComponent class
  hotelName = "Holiday Inn";
  numberOfRooms = 103;

  // Properties to manage front-end elements
  hideRooms = true;

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

  // Property to set the total bytes downloaded from an API vis HTTP
  totalBytes: number = 0;

  // Subscription object to manage many subscribe instances
  subscription!: Subscription;

  /**
   * Property to set the error messages when something goes wrong with the
   * communication while getting rooms information.
   */
  error$ = new Subject<string>();

  /**
   * Active stream to push all the error messages stored in the error$ property.
   */
  getError$ = this.error$.asObservable();

  /**
   * Property to set all the rooms' information by using the getRooms$ property
   * defined in the service. A catchError is used to manage the errors occurred.
   */
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      this.error$.next(err.message);

      return of([]);
    })
  );

  /**
   * Property to set the size of the rooms list obtained by using the getRooms$ property.
   * It is necessary to use a map inside the pipe.
   */
  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  );

  // Observable property that allow other components to subscribe.
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
      this.showButton = "Show";
    else
      this.showButton = "Hide";
  }

  ngOnInit(): void {
    // Call the method getPhotos to initialize
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: console.log("Request has been made"); break
        case HttpEventType.ResponseHeader: console.log("Request success"); break
        case HttpEventType.DownloadProgress: this.totalBytes += event.loaded; break;
        case HttpEventType.Response: console.log(event.body);
      }
    });

    // Printing the values of the stream after its initialization
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('Complete'),
      error: () => console.log('Error')
    });

    // Initialization of the stream to subscribe other elements
    this.stream.subscribe((data) => console.log(data));
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

  ngOnDestroy(): void {
    // Unsubscribe all inactive subscriptions in case of exist.
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
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

  /**
   * Edit and update a room specification of the inventory.
   */
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

  /**
   * Delete a room of the inventory.
   */
  deleteRoom() {
    this.roomsService.deleteRoom("cef2da3e-8470-4351-bdf1-9345ab10dd73").subscribe((data) => {
      this.roomList = data;
    });
  }
}
