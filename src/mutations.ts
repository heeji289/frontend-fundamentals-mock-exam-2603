import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelReservation, createReservation } from "pages/remotes";
import { queries } from "./queries";
import { Equipment } from "./types";

type CreateReservationInput = {
  roomId: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  equipment: Equipment[];
};

export function useCreateReservationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReservationInput) => createReservation(data),
    onSuccess: async (_data, variables) => {
      queryClient.invalidateQueries(queries.reservations(variables.date)),
      queryClient.invalidateQueries(queries.myReservations())
    },
  });
}

export function useCancelReservationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries(queries.reservationAll());
      queryClient.invalidateQueries(queries.myReservations())
    }
  })
}