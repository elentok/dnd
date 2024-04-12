import { Abilities, abilityScoreToModifier } from "../data/abilities.ts"
import { Armor } from "../data/equipment/armor.ts"
import { Bonus, createScore, Score } from "../data/score.ts"

/**
 * The base armor class when there is no armor equipped.
 */
export const BASE_ARMOR_CLASS = 10

/**
 * Calculates the base armor class (based on the character's dexterity and the
 * armor they're carrying - excluding shields, those are handled per-attack).
 */
export function calculateArmorClass(
  abilities: Abilities,
  armor?: Armor,
): Score {
  const dexterityBonus: Bonus = {
    value: abilityScoreToModifier(abilities.dexterity.value),
    source: { type: "ability", ability: "dexterity" },
  }

  return createScore(
    armor?.armorClass ?? BASE_ARMOR_CLASS,
    canUseDexterityBonus(dexterityBonus.value, armor) ? [dexterityBonus] : [],
  )
}

function canUseDexterityBonus(bonusValue: number, armor?: Armor): boolean {
  if (armor == null) return true

  if (!armor.includeDexterity) return false
  if (armor.maxDexterity != null && bonusValue > armor.maxDexterity) {
    return false
  }
  return true
}
