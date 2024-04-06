import {
  Abilities,
  Ability,
  abilityScoreToModifier,
} from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { diceValue, roll } from "../data/dice.ts"
import { Klass, klassFeatures } from "../data/klass.ts"
import { Race, raceAbilityBonus } from "../data/race.ts"
import { createScore, Score } from "../data/score.ts"

export interface CreateCharacterOptions {
  name?: string
  klass?: Klass
  race?: Race
}

export function createCharacter(
  { name = "Shnitzel the Magnificent", klass = "fighter", race = "human" }:
    CreateCharacterOptions = {},
): Character {
  const abilities = addRaceAbilityBonuses({
    abilities: rollAbilities(),
    race,
  })
  return {
    name,
    xp: 0,
    level: 1,
    hitPoints: calculateFirstLevelHitPoints({ klass, abilities }),
    race,
    klass,
    abilities,
  }
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

export function addRaceAbilityBonuses({
  abilities,
  race,
}: {
  abilities: Abilities
  race: Race
}): Abilities {
  const addBonus = (ability: Ability): Score => {
    const bonusValue = raceAbilityBonus(race, ability)
    const score = abilities[ability]

    if (bonusValue == null) return score

    return {
      ...score,
      bonuses: [...score.bonuses, {
        source: `${race} race bonus`,
        value: bonusValue,
      }],
    }
  }

  return {
    strength: addBonus("strength"),
    dexterity: addBonus("dexterity"),
    constitution: addBonus("constitution"),
    intelligence: addBonus("intelligence"),
    wisdom: addBonus("wisdom"),
    charisma: addBonus("charisma"),
  }
}

export function calculateFirstLevelHitPoints({
  klass,
  abilities,
}: {
  klass: Klass
  abilities: Abilities
}): Score {
  const { hitDie } = klassFeatures(klass)
  const consitutionModifier = abilityScoreToModifier(
    abilities.constitution.value,
  )
  return createScore(diceValue(hitDie), [
    { value: consitutionModifier, source: "Constitution Modifier" },
  ])
}
