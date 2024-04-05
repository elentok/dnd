import {
  Abilities,
  Ability,
  getAbilityModifier,
  getAbilityScore,
  rollAbilities,
  setAbilityScore,
} from "./abilities.ts"
import { diceValue } from "./dice.ts"
import { Klass, klassFeatures } from "./klass.ts"
import { getRaceAbilityBonus, Race } from "./race.ts"
import { createScore, Score } from "./score.ts"

export interface Character {
  /**
   * Experience Points
   */
  xp: number

  level: number
  name: string

  hitPoints: Score
  abilities: Abilities
  klass: Klass
  race: Race
}

export interface CreateCharacterOptions {
  name?: string
  klass?: Klass
  race?: Race
}

export function createCharacter(
  { name = "Shnitzel the Magnificent", klass = "fighter", race = "human" }:
    CreateCharacterOptions = {},
): Character {
  const abilities = calculateAbilityBonuses({
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

export function calculateAbilityBonuses({
  abilities,
  race,
}: {
  abilities: Abilities
  race: Race
}): Abilities {
  const newAbilities = new Map<Ability, Score>()
  for (const [ability, score] of abilities) {
    const bonuses = []

    const raceAbilityBonus = getRaceAbilityBonus(race, ability)
    if (raceAbilityBonus != null) {
      bonuses.push({ source: `${race} race bonus`, value: raceAbilityBonus })
    }

    newAbilities.set(ability, createScore(score.baseValue, bonuses))
  }
  return newAbilities
}

export function calculateFirstLevelHitPoints({
  klass,
  abilities,
}: {
  klass: Klass
  abilities: Abilities
}): Score {
  const { hitDie } = klassFeatures(klass)
  const consitutionModifier = getAbilityModifier(abilities, "constitution")
  return createScore(diceValue(hitDie), [
    { value: consitutionModifier, source: "Constitution Modifier" },
  ])
}

export function setCharacterAbilityScore(
  character: Character,
  ability: Ability,
  score: Score,
): Character {
  const newCharacter: Character = {
    ...character,
    abilities: setAbilityScore(character.abilities, ability, score),
  }

  if (newCharacter.level === 1 && ability === "constitution") {
    newCharacter.hitPoints = calculateFirstLevelHitPoints(newCharacter)
  }

  return newCharacter
}

export function incrementAbility(
  character: Character,
  ability: Ability,
): Character {
  const score = getAbilityScore(character.abilities, ability)
  return setCharacterAbilityScore(
    character,
    ability,
    createScore(score.baseValue + 1, score.bonuses),
  )
}

export function decrementAbility(
  character: Character,
  ability: Ability,
): Character {
  const score = getAbilityScore(character.abilities, ability)
  return setCharacterAbilityScore(
    character,
    ability,
    createScore(score.baseValue - 1, score.bonuses),
  )
}
