import { Ability } from "./abilities.ts"

export const RACES = [
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
  "halfElf",
  "halfOrc",
  "halfling",
  "human",
  "kenku",
  "kobold",
  "lizardfolk",
  "orc",
  "tabaxi",
  "tiefling",
  "triton",
] as const

export type Race = typeof RACES[number]

interface RaceFeatures {
  abilityBonuses?: Partial<Record<Ability, number>>
  notes?: string[]
}

const RACE_FEATURES: Partial<Record<Race, RaceFeatures>> = {
  dwarf: { abilityBonuses: { constitution: 2 } },
  elf: { abilityBonuses: { dexterity: 2 } },
  halfElf: {
    abilityBonuses: { charisma: 2 },
    notes: ["Add +1 to two ability scores (other than charisma)"],
  },
  gnome: { abilityBonuses: { intelligence: 2 } },
  dragonborn: {
    abilityBonuses: {
      strength: 2,
      charisma: 1,
    },
  },
  aasimar: {
    abilityBonuses: {
      charisma: 2,
      wisdom: 1,
    },
  },
  halfOrc: {
    abilityBonuses: {
      strength: 2,
      constitution: 1,
    },
  },
  halfling: {
    abilityBonuses: {
      dexterity: 2,
      constitution: 1,
    },
  },
  tiefling: {
    abilityBonuses: {
      charisma: 2,
      intelligence: 1,
    },
  },
  human: {
    abilityBonuses: {
      charisma: 1,
      constitution: 1,
      dexterity: 1,
      intelligence: 1,
      strength: 1,
      wisdom: 1,
    },
  },
}

export function raceFeatures(race: Race): RaceFeatures {
  return RACE_FEATURES[race] ?? {}
}

export function raceAbilityBonus(
  race: Race,
  ability: Ability,
): number | undefined {
  return raceFeatures(race).abilityBonuses?.[ability]
}

export function racePrettyName(race: Race): string {
  return race.replace(/\b[a-z]/g, (ch) => ch.toLocaleUpperCase())
}
