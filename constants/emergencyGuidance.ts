export type DisasterKey = "flood" | "earthquake" | "fire";

export type GuidanceItem = {
  title: string;
  severity: "High" | "Medium";
  offline: true;
  quickActions: string[];
  steps: { label: string; items: string[] }[];
  aftercare: string[];
};

export const emergencyGuidance: Record<DisasterKey, GuidanceItem> = {
  flood: {
    title: "Flood",
    severity: "High",
    offline: true,
    quickActions: [
      "Move to higher ground",
      "Avoid flood water",
      "Switch off electricity if safe",
    ],
    steps: [
      {
        label: "Immediate actions",
        items: [
          "Move to higher ground immediately and stay away from drains and canals.",
          "Do not walk or drive through flood water. Depth and current can be deceptive.",
          "If indoors, move valuables upward and unplug devices where possible.",
        ],
      },
      {
        label: "If you must evacuate",
        items: [
          "Take essential items only: phone, charger, medication, ID, water.",
          "Follow official instructions and avoid closed roads.",
          "Tell a trusted contact where you are going if possible.",
        ],
      },
      {
        label: "Safety notes",
        items: [
          "Avoid contact with contaminated water. Wash hands and wounds quickly.",
          "Watch for electrical hazards and unstable ground.",
        ],
      },
    ],
    aftercare: [
      "Return only when authorities say it is safe.",
      "Document damage if needed and check for mould or unsafe wiring.",
    ],
  },

  earthquake: {
    title: "Earthquake",
    severity: "High",
    offline: true,
    quickActions: ["Drop, Cover, Hold On", "Avoid windows", "Expect aftershocks"],
    steps: [
      {
        label: "During shaking",
        items: [
          "Drop to the ground, take cover under sturdy furniture, and hold on.",
          "Stay away from windows, shelves, and heavy objects that may fall.",
          "If outdoors, move to an open area away from buildings and power lines.",
        ],
      },
      {
        label: "After shaking stops",
        items: [
          "Check for injuries and provide basic first aid if safe.",
          "Move carefully and watch for broken glass and debris.",
          "Expect aftershocks. Be ready to Drop, Cover, Hold On again.",
        ],
      },
      {
        label: "If you smell gas or see damage",
        items: [
          "Turn off gas if you suspect a leak and it is safe to do so.",
          "Avoid open flames and damaged electrical equipment.",
          "Leave unsafe buildings and use stairs, not lifts.",
        ],
      },
    ],
    aftercare: [
      "Listen for official updates and local instructions.",
      "Text instead of calling to reduce network congestion.",
    ],
  },

  fire: {
    title: "Fire",
    severity: "High",
    offline: true,
    quickActions: ["Evacuate now", "Do not use lifts", "Stay low in smoke"],
    steps: [
      {
        label: "If you see smoke or flames",
        items: [
          "Evacuate immediately using the nearest safe exit.",
          "Do not use lifts. Use stairs and follow exit signs.",
          "If there is smoke, stay low and cover your nose and mouth.",
        ],
      },
      {
        label: "If clothing catches fire",
        items: ["Stop, Drop, and Roll until flames are out."],
      },
      {
        label: "If you cannot exit",
        items: [
          "Close doors and seal gaps with cloth to reduce smoke entry.",
          "Call emergency services and signal at a window if safe.",
          "Do not re-enter the building for belongings.",
        ],
      },
    ],
    aftercare: [
      "Seek medical help for burns or smoke inhalation.",
      "Only return when authorities declare it safe.",
    ],
  },
};
