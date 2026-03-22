import { MINUTES_PER_HOUR } from "../constants";

const TIMELINE_START = 9;
const TIMELINE_END = 20;
const MINIUTES = ['00', '30'] as const;

export const HOUR_LABELS = Array.from({ length: TIMELINE_END - TIMELINE_START + 1 }, (_, idx) => idx + TIMELINE_START);

export const TOTAL_MINUTES = (TIMELINE_END - TIMELINE_START) * MINUTES_PER_HOUR;

export const TIME_SLOTS = HOUR_LABELS.flatMap(hour => {
  const formattedHour = String(hour).padStart(2, '0');

  if (hour === TIMELINE_END) {
    return [`${formattedHour}:00`]
  }

  return MINIUTES.map(minute => `${formattedHour}:${minute}`)
})

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return (h - TIMELINE_START) * MINUTES_PER_HOUR + m;
}
