import { Character } from "../data/character.ts"
import { Armor } from "../data/equipment/armor.ts"
import { calculateArmorClass } from "./calculateArmorClass.ts"

export function equipArmor(character: Character, armor: Armor): Character {
  return {
    ...character,
    armor,
    armorClass: calculateArmorClass(character.abilities, armor),
  }
}

export function removeArmor(character: Character): Character {
  return {
    ...character,
    armor: undefined,
    armorClass: calculateArmorClass(character.abilities),
  }
}
