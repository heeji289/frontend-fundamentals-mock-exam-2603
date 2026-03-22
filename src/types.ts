import { formatDate } from "utils";
import z from "zod";

// 장비

export const ALL_EQUIPMENT = ['tv', 'whiteboard', 'video', 'speaker'] as const;

export type Equipment = typeof ALL_EQUIPMENT[number];

export const EQUIPMENT_LABELS: Record<Equipment, string> = {
  tv: 'TV',
  whiteboard: '화이트보드',
  video: '화상장비',
  speaker: '스피커',
}

// room 필터

export const roomFiltersSchema = z.object({
  date: z.iso.date().default(formatDate(new Date())),
  startTime: z.string().default(''),
  endTime: z.string().default(''),
  attendees: z.coerce.number().int().min(1).default(1),
  equipment: z.array(z.enum(ALL_EQUIPMENT)).default([]),
  preferredFloor: z.coerce.number().int().nullable().default(null)
})

export type RoomFilters = z.infer<typeof roomFiltersSchema>
