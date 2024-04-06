import { getAbilityModifier } from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { roll } from "../data/dice.ts"
import { klassFeatures } from "../data/klass.ts"
import { getLevel } from "../data/levels.ts"
import { Bonus, createScore } from "../data/score.ts"

export function addXp(character: Character, amount: number): Character {
  const xp = character.xp + amount
  const newLevel = getLevel(xp)

  const withMoreXp = { ...character, xp }

  return (newLevel === character.level) ? withMoreXp : levelUp(character)
}

export function levelUp(character: Character): Character {
  const hp = character.hitPoints
  const newHp = createScore(hp.baseValue, [
    ...hp.bonuses,
    ...rollLevelUpHitPointsBoost(character),
  ])
  return {
    ...character,
    level: character.level + 1,
    hitPoints: newHp,
  }
}

function rollLevelUpHitPointsBoost(character: Character): Bonus[] {
  const { klass, abilities, level } = character
  const { hitDie } = klassFeatures(klass)
  const consitutionModifier = getAbilityModifier(abilities, "constitution")
  const newLevel = level + 1
  return [
    {
      source: `1${hitDie} roll (level up to ${newLevel})`,
      value: roll(hitDie),
    },
    {
      source: `Consitution Modifier (level up to ${newLevel})`,
      value: consitutionModifier,
    },
  ]
}
