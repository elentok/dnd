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

export function klassPrettyName(klass: Klass): string {
  return klass.replace(/\b[a-z]/g, (ch) => ch.toLocaleUpperCase())
}

/**
 * Starting wealth value is calculated by {rolls}{dice} x {goldPiecesMultiplier}
 *
 * For example, a Bard starts with: 5d4 x 10 gp
 */
export interface StartingWealth {
  rolls: number
  dice: Dice
  multiplier: number
}

export interface KlassFeatures {
  hitDie: Dice
  startingWealth: StartingWealth
}

export const Klasses = new Map<Klass, KlassFeatures>([
  ["sorcrer", {
    hitDie: "d6",
    startingWealth: { rolls: 3, dice: "d4", multiplier: 10 },
  }],
  ["wizard", {
    hitDie: "d6",
    startingWealth: { rolls: 4, dice: "d4", multiplier: 10 },
  }],
  ["bard", {
    hitDie: "d8",
    startingWealth: { rolls: 5, dice: "d4", multiplier: 10 },
  }],
  ["cleric", {
    hitDie: "d8",
    startingWealth: { rolls: 5, dice: "d4", multiplier: 10 },
  }],
  ["druid", {
    hitDie: "d8",
    startingWealth: { rolls: 2, dice: "d4", multiplier: 10 },
  }],
  ["monk", {
    hitDie: "d8",
    startingWealth: { rolls: 5, dice: "d4", multiplier: 1 },
  }],
  ["rogue", {
    hitDie: "d8",
    startingWealth: { rolls: 4, dice: "d4", multiplier: 10 },
  }],
  ["warlock", {
    hitDie: "d8",
    startingWealth: { rolls: 4, dice: "d4", multiplier: 10 },
  }],
  ["fighter", {
    hitDie: "d10",
    startingWealth: { rolls: 5, dice: "d4", multiplier: 10 },
  }],
  ["paladin", {
    hitDie: "d10",
    startingWealth: { rolls: 5, dice: "d4", multiplier: 10 },
  }],
  ["ranger", {
    hitDie: "d10",
    startingWealth: { rolls: 5, dice: "d4", multiplier: 10 },
  }],
  ["barbarian", {
    hitDie: "d12",
    startingWealth: { rolls: 2, dice: "d4", multiplier: 10 },
  }],
])

export const ALL_KLASSES = Array.from(Klasses.keys())

export function klassFeatures(klass: Klass): KlassFeatures {
  const features = Klasses.get(klass)
  if (features == null) {
    throw new Error(`Invalid class '${klass}'`)
  }
  return features
}
