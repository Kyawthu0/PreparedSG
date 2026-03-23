export type DisasterKey = "flood" | "earthquake" | "fire";

export type ChecklistItem = {
  id: string;
  text: string;
};

export type ChecklistGroup = {
  title: string;
  items: ChecklistItem[];
};

export type PreparednessPack = {
  key: DisasterKey;
  title: string;
  intro: string;
  groups: ChecklistGroup[];
};

export const preparednessData: PreparednessPack[] = [
  {
    key: "flood",
    title: "Flood Preparedness",
    intro:
      "These checks focus on reducing risk before flooding and ensuring you can act quickly if water levels rise.",
    groups: [
      {
        title: "Before a Flood",
        items: [
          { id: "flood-1", text: "Prepare a go-bag (water, torch, power bank, basic first aid)." },
          { id: "flood-2", text: "Store important documents in a waterproof pouch." },
          { id: "flood-3", text: "Charge your phone and power bank when heavy rain is expected." },
          { id: "flood-4", text: "Identify higher ground routes near your home/workplace." },
          { id: "flood-5", text: "Keep emergency numbers accessible (e.g., 995)." },
        ],
      },
      {
        title: "If Flooding Is Likely",
        items: [
          { id: "flood-6", text: "Move valuables and electrical items to higher shelves." },
          { id: "flood-7", text: "Avoid basements or low-lying areas." },
          { id: "flood-8", text: "Wear covered shoes; avoid walking through floodwater." },
        ],
      },
    ],
  },
  {
    key: "earthquake",
    title: "Earthquake Preparedness",
    intro:
      "Earthquakes are rare locally, but preparedness is still useful for travel or unexpected incidents.",
    groups: [
      {
        title: "Before an Earthquake",
        items: [
          { id: "eq-1", text: "Secure heavy items (shelves, mirrors) where possible." },
          { id: "eq-2", text: "Identify safe spots: under sturdy tables or near interior walls." },
          { id: "eq-3", text: "Keep a torch and shoes near your bed if you are travelling." },
        ],
      },
      {
        title: "During",
        items: [
          { id: "eq-4", text: "Drop, Cover, Hold On until shaking stops." },
          { id: "eq-5", text: "Stay away from glass and unsecured objects." },
          { id: "eq-6", text: "If outside, move to an open area away from buildings." },
        ],
      },
      {
        title: "After",
        items: [
          { id: "eq-7", text: "Check yourself and others for injuries first." },
          { id: "eq-8", text: "Expect aftershocks; remain alert." },
          { id: "eq-9", text: "If you smell gas or see damage, move away and seek help." },
        ],
      },
    ],
  },
  {
    key: "fire",
    title: "Fire Preparedness",
    intro:
      "Fire response depends on speed and clarity. These checks emphasise early evacuation and safe decision-making.",
    groups: [
      {
        title: "Before a Fire",
        items: [
          { id: "fire-1", text: "Know your nearest exits and staircases (home and workplace)." },
          { id: "fire-2", text: "Avoid blocking corridors/exits with storage or furniture." },
          { id: "fire-3", text: "Keep a small torch accessible in case of smoke or blackout." },
        ],
      },
      {
        title: "If Fire/Smoke Is Detected",
        items: [
          { id: "fire-4", text: "Evacuate early. Do not delay to collect many belongings." },
          { id: "fire-5", text: "Do not use lifts. Use stairs." },
          { id: "fire-6", text: "If there is smoke, stay low and cover your nose/mouth." },
          { id: "fire-7", text: "Call 995 when safe to do so." },
        ],
      },
    ],
  },
];
