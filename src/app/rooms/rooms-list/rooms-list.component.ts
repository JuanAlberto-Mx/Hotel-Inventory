import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RoomList} from "../rooms";

@Component({
  selector: 'jahm-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges {

  @Input() roomsList: RoomList[] = [];
  @Input() title: string = "";
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Convert to Uppercase the title if changes
    if (changes["title"]) {
      this.title = changes["title"].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {
  }

  /**
   * Method to determine the room selected by the user.
   * @param room the selected room.
   */
  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

}
