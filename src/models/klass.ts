import { Dice } from "./dice.ts"

export type Klass =
  | "sorcerer"
  | "sorcrer"
  | "wizard"
  | "bard"
  | "cleric"
  | "druid"
  | "monk"
  | "rogue"
  | "warlock"
  | "fighter"
  | "paladin"
  | "ranger"
  | "barbarian"

export interface KlassFeatures {
  hitDie: Dice
}

export const Klasses = new Map<Klass, KlassFeatures>([
  ["sorcrer", { hitDie: "d6" }],
  ["wizard", { hitDie: "d6" }],
  ["bard", { hitDie: "d8" }],
  ["cleric", { hitDie: "d8" }],
  ["druid", { hitDie: "d8" }],
  ["monk", { hitDie: "d8" }],
  ["rogue", { hitDie: "d8" }],
  ["warlock", { hitDie: "d8" }],
  ["fighter", { hitDie: "d10" }],
  ["paladin", { hitDie: "d10" }],
  ["ranger", { hitDie: "d10" }],
  ["barbarian", { hitDie: "d12" }],
])

export const ALL_KLASSES = Array.from(Klasses.keys())

export function klassFeatures(klass: Klass): KlassFeatures {
  const features = Klasses.get(klass)
  if (features == null) {
    throw new Error(`Invalid class '${klass}'`)
  }
  return features
}
