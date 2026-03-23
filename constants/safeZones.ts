import type { HazardType } from "./mapConfig";

export type ZoneHazard = Exclude<HazardType, "all">;
export type SafeZoneCategory = "shelter" | "assembly-point" | "open-space";

export type SafeZone = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  category: SafeZoneCategory;
  hazards: ZoneHazard[];
};

export const SAFE_ZONES: SafeZone[] = [
  {
    id: "zone-1",
    name: "Central Assembly Area",
    latitude: 1.2906,
    longitude: 103.8519,
    address: "Central Area, Singapore",
    description:
      "Open assembly area for emergency gathering and safe-zone reference.",
    category: "assembly-point",
    hazards: ["fire", "earthquake"],
  },
  {
    id: "zone-2",
    name: "Riverside Shelter Point",
    latitude: 1.2872,
    longitude: 103.8466,
    address: "Boat Quay Area, Singapore",
    description:
      "Shelter point that can be used as a nearby safe-zone reference location.",
    category: "shelter",
    hazards: ["flood"],
  },
  {
    id: "zone-3",
    name: "Community Open Field",
    latitude: 1.3009,
    longitude: 103.8552,
    address: "Bugis Area, Singapore",
    description:
      "Open-space location that may serve as a gathering point during emergencies.",
    category: "open-space",
    hazards: ["earthquake", "fire"],
  },
  {
    id: "zone-4",
    name: "Northern Safe Zone",
    latitude: 1.3617,
    longitude: 103.8331,
    address: "Bishan Area, Singapore",
    description:
      "Safe-zone location covering more than one emergency scenario.",
    category: "open-space",
    hazards: ["flood", "earthquake"],
  },
  {
    id: "zone-5",
    name: "Eastern Shelter Point",
    latitude: 1.3174,
    longitude: 103.8947,
    address: "Kallang Area, Singapore",
    description:
      "Shelter point included for nearby location reference and safe-zone access.",
    category: "shelter",
    hazards: ["flood", "fire"],
  },
  {
    id: "zone-6",
    name: "Southern Assembly Point",
    latitude: 1.2764,
    longitude: 103.8018,
    address: "HarbourFront Area, Singapore",
    description:
      "Assembly point for emergency gathering and map-based safe-zone viewing.",
    category: "assembly-point",
    hazards: ["fire"],
  },
];