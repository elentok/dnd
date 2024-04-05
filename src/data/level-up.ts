import { getAbilityModifier } from "./abilities.ts"
import { Character } from "./character.ts"
import { roll } from "./dice.ts"
import { klassFeatures } from "./klass.ts"
import { Bonus, createScore } from "./score.ts"

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
      source: `1D${hitDie} roll (level up to ${newLevel})`,
      value: roll(hitDie),
    },
    {
      source: `Consitution Modifier (level up to ${newLevel})`,
      value: consitutionModifier,
    },
  ]
}
