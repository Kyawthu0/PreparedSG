export type HazardType = "all" | "flood" | "fire" | "earthquake";

export const MAP_FILTERS: { key: HazardType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "flood", label: "Flood" },
  { key: "fire", label: "Fire" },
  { key: "earthquake", label: "Earthquake" },
];

export const INITIAL_REGION = {
  latitude: 1.3521,
  longitude: 103.8198,
  latitudeDelta: 0.22,
  longitudeDelta: 0.22,
};

export const MAP_EDGE_PADDING = {
  top: 80,
  right: 80,
  bottom: 80,
  left: 80,
};

export const HAZARD_COLORS = {
  flood: "#3B82F6",
  fire: "#F97316",
  earthquake: "#EAB308",
} as const;