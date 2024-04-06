import {
  ABILITIES,
  abilityPrettyName,
  abilityScoreToPrettyModifier,
} from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { klassPrettyName } from "../data/klass.ts"
import { calcXpToNextLevel } from "../data/levels.ts"
import { racePrettyName } from "../data/race.ts"
import { Bonus, Score } from "../data/score.ts"

export function printCharacter(character: Character): void {
  const { name, xp, level, race, abilities, klass, hitPoints } = character

  const description = [
    "Level",
    level,
    racePrettyName(race),
    klassPrettyName(klass),
  ].join(" ")

  console.info(`${name} (${description})`)
  console.info(`- XP: ${xp} (${calcXpToNextLevel(xp)} to next level)`)
  console.info(`- HP: ${stringifyScore(hitPoints)}`)
  console.info("- Abilities:")
  for (const ability of ABILITIES) {
    const score = abilities[ability]
    const modifier = abilityScoreToPrettyModifier(score.value)
    console.info(
      `  - ${abilityPrettyName(ability)}: ${modifier} ${stringifyScore(score)}`,
    )
  }
}

function stringifyScore({ bonuses, value, baseValue }: Score): string {
  if (bonuses.length === 0) return `${value}`

  const prettyBonuses = bonuses.map(stringifyBonus).join(" ")
  return `${value} = ${baseValue} ${prettyBonuses}`
}

function stringifyBonus({ value, source }: Bonus): string {
  const prettyValue = value > 0 ? `+${value}` : value
  return `${prettyValue} (${source})`
}
