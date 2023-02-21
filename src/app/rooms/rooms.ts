/**
 * Interface to encapsulate the main attributes of the hotel.
 */
export interface Room {
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
}

/**
 * Interface to encapsulate the main attributes of a room.
 */
export interface RoomList {
  roomNumber: number;
  roomType: string;
  amenities: string;
  price: number;
  photos:string;
  checkinTime: Date;
  checkoutTime: Date;
  rating: number;
}
