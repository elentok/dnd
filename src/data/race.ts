import { Ability } from "./abilities.ts"

export type Race =
  | "aarakocra"
  | "aasimar"
  | "dragonborn"
  | "dwarf"
  | "elf"
  | "firbolg"
  | "genasi"
  | "gnome"
  | "goblin"
  | "goliath"
  | "half-elf"
  | "half-orc"
  | "halfling"
  | "human"
  | "kenku"
  | "kobold"
  | "lizardfolk"
  | "orc"
  | "tabaxi"
  | "tiefling"
  | "triton"

export function racePrettyName(race: Race): string {
  return race.replace(/\b[a-z]/g, (ch) => ch.toLocaleUpperCase())
}

export const ALL_RACES: Race[] = [
  "aarakocra",
  "aasimar",
  "dragonborn",
  "dwarf",
  "elf",
  "firbolg",
  "genasi",
  "gnome",
  "goblin",
  "goliath",
  "half-elf",
  "half-orc",
  "halfling",
  "human",
  "kenku",
  "kobold",
  "lizardfolk",
  "orc",
  "tabaxi",
  "tiefling",
  "triton",
]

interface RaceFeatures {
  abilityBonuses?: RaceAbilityBonus[]
  notes?: string[]
}

interface RaceAbilityBonus {
  ability: Ability
  value: number
}

const RACE_FEATURES = new Map<Race, RaceFeatures>([
  ["dwarf", { abilityBonuses: [{ ability: "constitution", value: 2 }] }],
  ["elf", { abilityBonuses: [{ ability: "dexterity", value: 2 }] }],
  ["half-elf", {
    abilityBonuses: [{ ability: "charisma", value: 2 }],
    notes: ["Add +1 to two ability scores (other than charisma)"],
  }],
  ["gnome", { abilityBonuses: [{ ability: "intelligence", value: 2 }] }],
  [
    "dragonborn",
    {
      abilityBonuses: [
        { ability: "strength", value: 2 },
        { ability: "charisma", value: 1 },
      ],
    },
  ],
  [
    "aasimar",
    {
      abilityBonuses: [
        { ability: "charisma", value: 2 },
        { ability: "wisdom", value: 1 },
      ],
    },
  ],
  [
    "half-orc",
    {
      abilityBonuses: [
        { ability: "strength", value: 2 },
        { ability: "constitution", value: 1 },
      ],
    },
  ],
  [
    "halfling",
    {
      abilityBonuses: [
        { ability: "dexterity", value: 2 },
        { ability: "constitution", value: 1 },
      ],
    },
  ],
  [
    "tiefling",
    {
      abilityBonuses: [
        { ability: "charisma", value: 2 },
        { ability: "intelligence", value: 1 },
      ],
    },
  ],
  [
    "human",
    {
      abilityBonuses: [
        { ability: "charisma", value: 1 },
        { ability: "constitution", value: 1 },
        { ability: "dexterity", value: 1 },
        { ability: "intelligence", value: 1 },
        { ability: "strength", value: 1 },
        { ability: "wisdom", value: 1 },
      ],
    },
  ],
])

export function getRaceFeatures(race: Race): RaceFeatures {
  return RACE_FEATURES.get(race) ?? {}
}

export function getRaceAbilityBonus(
  race: Race,
  ability: Ability,
): number | undefined {
  return getRaceFeatures(race)?.abilityBonuses?.find((b) =>
    b.ability === ability
  )?.value
}
