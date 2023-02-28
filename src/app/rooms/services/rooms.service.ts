import {Inject, Injectable} from '@angular/core';
import {RoomList} from "../rooms";
import {APP_SERVICE_CONFIG} from "../../AppConfig/appconfig.service";
import {AppConfig} from "../../AppConfig/appconfig.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  /**
   * Constructor with @Inject decorator as a dependency injection alternative.
   * @param appServiceConfig the instance to access APP_SERVICE_CONFIG
   * @param httpClient the instance to communicate the API via HTTP.
   */
    constructor(@Inject(APP_SERVICE_CONFIG) private appServiceConfig: AppConfig, private httpClient: HttpClient) {
      console.log("@Inject " + appServiceConfig.apiEndpoint);
      console.log("Rooms Service initialized");
    }

  /**
   * Gets a room list by calling the Hotel Inventory API via HTTP.
   * The HTTP is specified in the proxy.conf.json
   */
  getRooms() {
      return this.httpClient.get<RoomList[]>('/api/rooms');
  }

  /**
   * Add a new room by calling the Hotel Inventory API via HTTP.
   * @param room the room specifications.
   */
  addRoom(room: RoomList) {
    return this.httpClient.post<RoomList[]>('/api/rooms', room);
  }

  /**
   * Edit and update a room specification by calling the Hotel Inventory API
   * via HTTP and sending the room number as a parameter.
   * @param room the room specification to edit.
   */
  editRoom(room: RoomList) {
    return this.httpClient.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  /**
   * Delete a room specification by calling the Hotel Inventory API
   * via HTTP and sending the room number as a parameter.
   * @param id the room number to delete.
   */
  deleteRoom(roomNumber: string) {
    return this.httpClient.delete<RoomList[]>(`/api/rooms/${roomNumber}`);
  }
}
