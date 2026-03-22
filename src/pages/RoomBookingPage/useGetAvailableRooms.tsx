import { useQuery } from "@tanstack/react-query";
import { Reservation, Room } from "_tosslib/server/types";
import { queries } from "../../queries";
import { RoomFilters } from "../../types";

function isAttendeesCapable(room: Room, filter: RoomFilters) {
  return room.capacity >= filter.attendees;
}

function isEquipmentFulfilled(room: Room, filter: RoomFilters) {
  return filter.equipment.every(eq => room.equipment.includes(eq));
}

function isPreferredFloorMatched(room: Room, filter: RoomFilters) {
  return filter.preferredFloor === null || room.floor === filter.preferredFloor;
}

function hasConflict(room: Room, reservations: Reservation[], filter: RoomFilters) {
  return reservations.some(
    reservation =>
      reservation.roomId === room.id &&
      reservation.date === filter.date &&
      reservation.start < filter.endTime &&
      reservation.end > filter.startTime
  );
}

function sortByFloorAndName(a: Room, b: Room) {
  if (a.floor !== b.floor) return a.floor - b.floor;
  return a.name.localeCompare(b.name);
}

/**
 * 예약 가능한 방 목록을 출력하는 훅
 */
export function useGetAvailableRooms(filter: RoomFilters) {
  const { data: rooms = [] } = useQuery(queries.rooms());
  const { data: reservations = [] } = useQuery({
    ...queries.reservations(filter.date),
    enabled: !!filter.date,
  });

  const availableRooms = rooms
    .filter(room => {
      return (
        isAttendeesCapable(room, filter) &&
        isEquipmentFulfilled(room, filter) &&
        isPreferredFloorMatched(room, filter) &&
        !hasConflict(room, reservations, filter)
      );
    })
    .sort(sortByFloorAndName);

  return {
    rooms,
    availableRooms,
  };
}
