// constants/alertSources.ts

export type AlertSource = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: "Earthquake" | "Wildfire" | "Weather" | "Humanitarian" | "Multi-hazard";
  region: "Global" | "Singapore" | "Regional";
};

export const ALERT_SOURCES: AlertSource[] = [
  {
    id: "sg-nea",
    title: "NEA (Singapore) — Weather & Hazards",
    description: "Official Singapore environment updates, weather, haze, advisories.",
    url: "https://www.nea.gov.sg/",
    category: "Weather",
    region: "Singapore",
  },
  {
    id: "sg-mss",
    title: "Meteorological Service Singapore",
    description: "Official forecasts and weather-related advisories for Singapore.",
    url: "https://www.weather.gov.sg/home/",
    category: "Weather",
    region: "Singapore",
  },
  {
    id: "usgs",
    title: "USGS Earthquake Hazards Program",
    description: "Stable global earthquake updates and maps.",
    url: "https://earthquake.usgs.gov/",
    category: "Earthquake",
    region: "Global",
  },
  {
    id: "nasa-firms",
    title: "NASA FIRMS — Wildfire Map",
    description: "Global fire detections and wildfire monitoring.",
    url: "https://firms.modaps.eosdis.nasa.gov/",
    category: "Wildfire",
    region: "Global",
  },
  {
    id: "reliefweb",
    title: "ReliefWeb — Disaster Updates",
    description: "Humanitarian disaster updates (widely used, credible).",
    url: "https://reliefweb.int/disasters",
    category: "Humanitarian",
    region: "Global",
  },
  {
    id: "gdacs",
    title: "GDACS — Global Disaster Alerts",
    description: "Multi-hazard alerts and coordination information.",
    url: "https://www.gdacs.org/",
    category: "Multi-hazard",
    region: "Global",
  },
];
