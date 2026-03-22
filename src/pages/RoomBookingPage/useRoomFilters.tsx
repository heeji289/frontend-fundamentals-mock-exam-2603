import { useSearchParams } from "react-router-dom";
import { RoomFilters, roomFiltersSchema } from "../../types";

export function useRoomFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const parseRoomFilters = (searchParams: URLSearchParams): RoomFilters => {
    const raw = {
      date: searchParams.get('date') ?? undefined,
      startTime: searchParams.get('startTime') ?? undefined,
      endTime: searchParams.get('endTime') ?? undefined,
      attendees: searchParams.get('attendees') ?? undefined,
      equipment: searchParams.get('equipment')
        ? searchParams.get('equipment')!.split(',').filter(Boolean)
        : undefined,
      preferredFloor: searchParams.get('floor') ?? null,
    }

    const result = roomFiltersSchema.safeParse(raw)

    if (!result.success) {
      console.error(`유효하지 않은 파라미터, ${JSON.stringify(result.error.issues)}`)
      return roomFiltersSchema.parse({})
    }

    return result.data
  }

  const serializeRoomFilters = (filters: RoomFilters): URLSearchParams => {
    const {date, startTime, endTime, attendees, equipment, preferredFloor} = filters;

    const params = new URLSearchParams();

    if (date) params.set('date', date)
    if (startTime) params.set('startTime', startTime)
    if (endTime) params.set('endTime', endTime)
    if (attendees > 1) params.set('attendees', String(attendees))
    if (equipment.length > 0) params.set('equipment', equipment.join(','))
    if (preferredFloor !== null) params.set('floor', String(preferredFloor))

    return params
  }

  const updateRoomFiltersParam = (currentSearchParams: URLSearchParams, changedSearchParams: Partial<RoomFilters>): URLSearchParams => {
    const current = parseRoomFilters(currentSearchParams);

    const updated: RoomFilters = {
      ...current,
      ...changedSearchParams
    }

    return serializeRoomFilters(updated)
  }

  const filters = parseRoomFilters(searchParams);

  const updateRoomFilters = (changed: Partial<RoomFilters>) => {
    setSearchParams((prev) => updateRoomFiltersParam(prev, changed))
  }

  return {
    filters,
    updateRoomFilters
  }
}
