import {
  ABILITIES,
  abilityPrettyName,
  abilityScoreToPrettyModifier,
} from "../data/abilities.ts"
import { Character } from "../data/character.ts"
import { klassPrettyName } from "../data/klass.ts"
import { calcXpToNextLevel } from "../data/levels.ts"
import { racePrettyName } from "../data/race.ts"
import { serializeScore } from "../serialize.ts"

export function printCharacter(character: Character): void {
  const { name, xp, level, race, abilities, klass, hitPoints, armorClass } =
    character

  const description = [
    "Level",
    level,
    racePrettyName(race),
    klassPrettyName(klass),
  ].join(" ")

  console.info(`${name} (${description})`)
  console.info(`- XP: ${xp} (${calcXpToNextLevel(xp)} to next level)`)
  console.info(`- HP: ${serializeScore(hitPoints)}`)
  console.info(`- AC: ${serializeScore(armorClass)}`)
  console.info("- Abilities:")
  for (const ability of ABILITIES) {
    const score = abilities[ability]
    const modifier = abilityScoreToPrettyModifier(score.value)
    console.info(
      `  - ${abilityPrettyName(ability)}: ${modifier} ${serializeScore(score)}`,
    )
  }
}
