import { Ability } from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { createScore, Score } from "../data/score.ts"
import { calculateFirstLevelHitPoints } from "./createCharacter.ts"

export function incrementAbility(
  character: Character,
  ability: Ability,
): Character {
  const score = character.abilities[ability]
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
  const score = character.abilities[ability]
  return setCharacterAbilityScore(
    character,
    ability,
    createScore(score.baseValue - 1, score.bonuses),
  )
}

function setCharacterAbilityScore(
  character: Character,
  ability: Ability,
  score: Score,
): Character {
  const newCharacter: Character = {
    ...character,
    abilities: {
      ...character.abilities,
      [ability]: score,
    },
  }

  if (newCharacter.level === 1 && ability === "constitution") {
    newCharacter.hitPoints = calculateFirstLevelHitPoints(newCharacter)
  }

  return newCharacter
}
