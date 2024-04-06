import { roll } from "./dice.ts"
import { createScore, Score } from "./score.ts"

export interface Abilities {
  strength: Score
  dexterity: Score
  constitution: Score
  intelligence: Score
  wisdom: Score
  charisma: Score
}

export type Ability = keyof Abilities

export const ABILITIES: Ability[] = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
]

export const DEFAULT_ABILITIES: Abilities = {
  strength: createScore(15),
  dexterity: createScore(15),
  constitution: createScore(13),
  intelligence: createScore(12),
  wisdom: createScore(10),
  charisma: createScore(8),
}

export function abilityPrettyName(ability: Ability): string {
  return ability.replace(/^[a-z]/, (ch) => ch.toLocaleUpperCase())
}

/**
 * Roll 4d6, take the 3 highest values and sum them.
 */
export function rollAbilityScore(): Score {
  const rolls = Array.from({ length: 4 })
    .map(() => roll("d6"))
    .sort((a, b) => b - a)

  const highestThree = rolls.slice(0, 3)

  return createScore(highestThree.reduce((sum, roll) => (sum += roll), 0))
}

export function rollAbilities(): Abilities {
  return {
    strength: rollAbilityScore(),
    dexterity: rollAbilityScore(),
    constitution: rollAbilityScore(),
    intelligence: rollAbilityScore(),
    wisdom: rollAbilityScore(),
    charisma: rollAbilityScore(),
  }
}

export function abilityScoreToModifier(score: number): number {
  return Math.floor((score - 10) / 2)
}

export function abilityScoreToPrettyModifier(score: number): string {
  const modifier = abilityScoreToModifier(score)
  return modifier > 0 ? `(+${modifier})` : `(${modifier})`
}

// export function getAbilityScore(abilities: Abilities, ability: Ability): Score {
//   const score = abilities.get(ability)
//   if (score == null) {
//     throw new Error(`No score for ability '${ability}'`)
//   }
//   return score
// }

// export function setAbilityScore(
//   abilities: Abilities,
//   ability: Ability,
//   score: Score,
// ): Abilities {
//   return new Map(abilities).set(ability, score)
// }

// export function getAbilityModifier(
//   abilities: Abilities,
//   ability: Ability,
// ): number {
//   return abilityScoreToModifier(getAbilityScore(abilities, ability).value)
// }
