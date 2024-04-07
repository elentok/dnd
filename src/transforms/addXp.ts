import { abilityScoreToModifier } from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { roll } from "../data/dice.ts"
import { klassFeatures } from "../data/klass.ts"
import { calcXpToNextLevel, getLevel } from "../data/levels.ts"
import { Bonus, createScore } from "../data/score.ts"
import { TransformResult } from "./types.ts"

export function addXp(character: Character, amount: number): TransformResult {
  const xp = character.xp + amount
  const newLevel = getLevel(xp)

  const withMoreXp = { ...character, xp }

  const notes = [
    `XP increased from ${character.xp} to ${xp}`,
  ]

  if (newLevel === character.level) {
    return {
      character: withMoreXp,
      notes: [
        ...notes,
        `XP required to level up: ${calcXpToNextLevel(xp)} `,
      ],
    }
  }

  const leveledUp = levelUp(withMoreXp)
  return {
    ...leveledUp,
    notes: [...notes, ...leveledUp.notes ?? []],
  }
}

export function levelUp(character: Character): TransformResult {
  const hp = character.hitPoints
  const newHp = createScore(hp.baseValue, [
    ...hp.bonuses,
    ...rollLevelUpHitPointsBoost(character),
  ])
  const leveledUpCharater: Character = {
    ...character,
    level: character.level + 1,
    hitPoints: newHp,
  }
  return {
    character: leveledUpCharater,
    notes: [
      `Leveled up to ${leveledUpCharater.level}`,
      `HP up from ${hp.value} to ${newHp.value}`,
    ],
  }
}

function rollLevelUpHitPointsBoost(character: Character): Bonus[] {
  const { klass, abilities, level } = character
  const { hitDie } = klassFeatures(klass)
  const constitutionModifier = abilityScoreToModifier(
    abilities.constitution.value,
  )
  const newLevel = level + 1
  return [
    {
      source: `1${hitDie} roll (level up to ${newLevel})`,
      value: roll(hitDie),
    },
    {
      source: `Constitution Modifier (level up to ${newLevel})`,
      value: constitutionModifier,
    },
  ]
}
