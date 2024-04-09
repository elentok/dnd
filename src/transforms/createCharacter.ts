import {
  Abilities,
  Ability,
  abilityScoreToModifier,
} from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { diceValue, roll } from "../data/dice.ts"
import { Klass, klassFeatures } from "../data/klass.ts"
import { Race, raceAbilityBonus } from "../data/race.ts"
import { addBonus, createScore, Score } from "../data/score.ts"

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
    armorClass: createScore(10, [{
      value: abilityScoreToModifier(abilities.dexterity.value),
      source: { type: "ability", ability: "dexterity" },
    }]),
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
  const addRaceAbilityBonus = (ability: Ability): Score => {
    const bonusValue = raceAbilityBonus(race, ability)
    const score = abilities[ability]
    return (bonusValue == null) ? score : addBonus(score, {
      source: { type: "race" },
      value: bonusValue,
    })
  }

  return {
    strength: addRaceAbilityBonus("strength"),
    dexterity: addRaceAbilityBonus("dexterity"),
    constitution: addRaceAbilityBonus("constitution"),
    intelligence: addRaceAbilityBonus("intelligence"),
    wisdom: addRaceAbilityBonus("wisdom"),
    charisma: addRaceAbilityBonus("charisma"),
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
    {
      value: consitutionModifier,
      source: { type: "ability", ability: "constitution" },
    },
  ])
}
