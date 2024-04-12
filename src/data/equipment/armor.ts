import { Money, money } from "../money.ts"
import { Weight, weight } from "../weight.ts"

export type ArmorType = "light" | "medium" | "heavy"

export interface Armor {
  name: string
  type: "armor"
  armorType: ArmorType
  armorClass: number
  includeDexterity?: boolean
  maxDexterity?: number
  stealthDisadvantage?: boolean
  cost: Money
  weight: Weight
}

function armor(
  armorType: ArmorType,
  name: string,
  opts: Omit<Armor, "name" | "type" | "armorType">,
): Armor {
  return {
    type: "armor",
    name,
    armorType,
    ...opts,
  }
}

export const ARMORS: Armor[] = [
  armor("light", "Padded Armor", {
    cost: money(5, "gold"),
    armorClass: 11,
    includeDexterity: true,
    weight: weight(8, "lb"),
    stealthDisadvantage: true,
  }),
  armor("light", "Leather Armor", {
    cost: money(10, "gold"),
    armorClass: 11,
    includeDexterity: true,
    weight: weight(10, "lb"),
  }),
  armor("light", "Studded Leather", {
    cost: money(45, "gold"),
    armorClass: 12,
    includeDexterity: true,
    weight: weight(13, "lb"),
  }),
  armor("medium", "Hide", {
    cost: money(10, "gold"),
    armorClass: 12,
    includeDexterity: true,
    maxDexterity: 2,
    weight: weight(12, "lb"),
  }),
  armor("medium", "Chain shirt", {
    cost: money(50, "gold"),
    armorClass: 13,
    includeDexterity: true,
    maxDexterity: 2,
    weight: weight(20, "lb"),
  }),
  armor("medium", "Scale mail", {
    cost: money(50, "gold"),
    armorClass: 14,
    includeDexterity: true,
    maxDexterity: 2,
    stealthDisadvantage: true,
    weight: weight(45, "lb"),
  }),
  armor("medium", "Breastplate", {
    cost: money(400, "gold"),
    armorClass: 14,
    includeDexterity: true,
    maxDexterity: 2,
    weight: weight(20, "lb"),
  }),
  armor("medium", "Half plate", {
    cost: money(750, "gold"),
    armorClass: 15,
    includeDexterity: true,
    maxDexterity: 2,
    stealthDisadvantage: true,
    weight: weight(40, "lb"),
  }),
  armor("heavy", "Ring mail", {
    cost: money(30, "gold"),
    armorClass: 14,
    stealthDisadvantage: true,
    weight: weight(40, "lb"),
  }),
  armor("heavy", "Chain mail", {
    cost: money(75, "gold"),
    armorClass: 16,
    stealthDisadvantage: true,
    weight: weight(55, "lb"),
  }),
  armor("heavy", "Splint", {
    cost: money(200, "gold"),
    armorClass: 17,
    stealthDisadvantage: true,
    weight: weight(60, "lb"),
  }),
  armor("heavy", "Plate", {
    cost: money(1_500, "gold"),
    armorClass: 18,
    stealthDisadvantage: true,
    weight: weight(65, "lb"),
  }),
]

// TODO:
// armor("shield", "Shield", {
//   cost: money(10, "gold"),
//   armorClassBonus: 2,
//   weight: weight(6, "lb"),
// }),
