import { queryOptions } from "@tanstack/react-query";
import { getMyReservations, getReservations, getRooms } from "pages/remotes";

export const queries = {
	rooms: () => {
		return queryOptions({
			queryKey: ['rooms'],
			queryFn: getRooms
		})
	},
	reservationAll: () => ['reservations'],
	reservations: (date: string) => {
		return queryOptions({
			queryKey: [...queries.reservationAll(), date],
			queryFn: () => getReservations(date)
		})
	},
	myReservations: () => {
		return queryOptions({
			queryKey: ['myReservations'],
			queryFn: getMyReservations
		})
	}
}
