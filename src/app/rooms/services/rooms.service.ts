import {Inject, Injectable} from '@angular/core';
import {RoomList} from "../rooms";
import {APP_SERVICE_CONFIG} from "../../AppConfig/appconfig.service";
import {AppConfig} from "../../AppConfig/appconfig.interface";
import {HttpClient, HttpRequest} from "@angular/common/http";
import {shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  /**
   * Stream property of RxJs style.
   * It is necessary to use the $ sign to specify we are working with a stream.
   * It is possible to send some custom headers as parameters.
   * The shareReplay function allows replaying a specific number of emissions on subscriptions.
   */
  getRooms$ = this.httpClient.get<RoomList[]>('/api/rooms').pipe(shareReplay(1));

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
   * @param roomNumber the room number to delete.
   */
  deleteRoom(roomNumber: string) {
    return this.httpClient.delete<RoomList[]>(`/api/rooms/${roomNumber}`);
  }

  /**
   * Method to obtain a set of photos provided by a free online API vía HTTP.
   */
  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true
    });

    return this.httpClient.request(request);
  }
}
