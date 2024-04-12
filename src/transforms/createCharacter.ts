import {
  Abilities,
  Ability,
  abilityScoreToModifier,
} from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { diceValue, roll } from "../data/dice.ts"
import { Armor } from "../data/equipment/armor.ts"
import { Klass, klassFeatures } from "../data/klass.ts"
import { Race, raceAbilityBonus } from "../data/race.ts"
import { addBonus, createScore, Score } from "../data/score.ts"
import { calculateArmorClass } from "./calculateArmorClass.ts"

export interface CreateCharacterOptions {
  name?: string
  klass?: Klass
  race?: Race
  baseAbilities?: BaseAbilities
  armor?: Armor
}

interface BaseAbilities {
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
}

export function createCharacter(
  {
    name = "Shnitzel the Magnificent",
    klass = "fighter",
    race = "human",
    baseAbilities = {},
    armor,
  }: CreateCharacterOptions = {},
): Character {
  const abilities = addRaceAbilityBonuses({
    abilities: calculateAbilities(baseAbilities),
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
    armor,
    armorClass: calculateArmorClass(abilities, armor),
  }
}

export function calculateAbilities(base: BaseAbilities = {}): Abilities {
  return {
    strength: calculateAbility(base.strength),
    dexterity: calculateAbility(base.dexterity),
    constitution: calculateAbility(base.constitution),
    intelligence: calculateAbility(base.intelligence),
    wisdom: calculateAbility(base.wisdom),
    charisma: calculateAbility(base.charisma),
  }
}

export function calculateAbility(base?: number): Score {
  return createScore(base != null ? base : rollAbilityScore())
}

/**
 * Roll 4d6, take the 3 highest values and sum them.
 */
export function rollAbilityScore(): number {
  const rolls = Array.from({ length: 4 })
    .map(() => roll("d6"))
    .sort((a, b) => b - a)

  const highestThree = rolls.slice(0, 3)

  return highestThree.reduce((sum, roll) => (sum += roll), 0)
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
