import {
  Abilities,
  Ability,
  DEFAULT_ABILITIES,
  getAbilityModifier,
  getAbilityScore,
  setAbilityScore,
} from "./abilities.ts"
import { diceValue } from "./dice.ts"
import { Klass, klassFeatures } from "./klass.ts"
import { Race } from "./race.ts"
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

export function createDefaultCharacter(): Character {
  const klass: Klass = "fighter"
  const abilities = new Map(DEFAULT_ABILITIES)
  return {
    name: "Shnitzel the Magnificent",
    xp: 0,
    level: 1,
    hitPoints: calculateFirstLevelHitPoints({ klass, abilities }),
    race: "dragonborn",
    klass,
    abilities,
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