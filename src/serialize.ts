import { parse, stringify } from "https://deno.land/std@0.207.0/toml/mod.ts"
import { Character } from "./data/character.ts"
import { number, object, string } from "npm:yup"
import { Bonus, Score } from "./data/score.ts"
import {
  ABILITIES,
  Abilities,
  Ability,
  abilityScoreToModifier,
  abilityScoreToPrettyModifier,
  getAbilityModifier,
} from "./data/abilities.ts"
import { ALL_RACES } from "./data/race.ts"
import { ALL_KLASSES } from "./data/klass.ts"

const characterSchema = object({
  name: string().required(),
  xp: number().required(),
  level: number().required(),
  hitPoints: string().required(),
  race: string().required().oneOf(ALL_RACES),
  klass: string().required().oneOf(ALL_KLASSES),
  abilities: object({
    strength: string().required(),
    dexterity: string().required(),
    constitution: string().required(),
    intelligence: string().required(),
    wisdom: string().required(),
    charisma: string().required(),
  }),
})

export function serializeCharacter(character: Character): string {
  return stringify({
    ...character,
    hitPoints: serializeScore(character.hitPoints),
    abilities: serializeAbilities(character.abilities),
  })
}

export function deserializeCharacter(serialized: string): Character {
  const rawCharacter1 = parse(serialized)
  const { name, xp, level, hitPoints, race, klass, abilities } = characterSchema
    .validateSync(rawCharacter1)

  return {
    name,
    xp,
    level,
    race,
    klass,
    hitPoints: deserializeScore(hitPoints),
    abilities: deserializeAbilities(abilities),
  }
}

function serializeAbilities(abilities: Abilities): Record<string, string> {
  const serialized: Record<string, string> = {}
  abilities.forEach((score, ability) => {
    serialized[ability] = `${abilityScoreToPrettyModifier(score.value)} ${
      serializeScore(score)
    }`
  })
  return serialized
}

function deserializeAbilities(
  rawAbilities: Record<Ability, string>,
): Abilities {
  return new Map<Ability, Score>(
    ABILITIES.map((ability) => {
      const scoreWithModifier = rawAbilities[ability]
      const score = scoreWithModifier.replace(/^\(\+?\d+\) /, "")
      return [ability, deserializeScore(score)]
    }),
  )
}

function serializeScore({ bonuses, value, baseValue }: Score): string {
  if (bonuses.length === 0) return `${value}`

  const prettyBonuses = bonuses.map(stringifyBonus).join(", ")
  return `${value} = ${baseValue} ${prettyBonuses}`
}

function stringifyBonus({ value, source }: Bonus): string {
  const prettyValue = value > 0 ? `+${value}` : value
  return `${prettyValue} (${source})`
}

function deserializeScore(serialized: string): Score {
  const match = /^(\d+) = (\d+) (.*)/.exec(serialized)
  if (match == null) {
    throw new Error(`Cannot desrialize score '${serialized}'`)
  }

  const value = Number(match[1])
  const baseValue = Number(match[2])
  const bonuses: Bonus[] = match[3].split(", ").map((bonus) => {
    const bonusMatch = /^(\+?\d+) \((.*)\)$/.exec(bonus)
    if (bonusMatch == null) {
      throw new Error(
        `Cannot deserialize bonus '${bonus}' of score '${serialized}`,
      )
    }

    return {
      value: Number(bonusMatch[1]),
      source: bonusMatch[2],
    }
  })

  return { value, baseValue, bonuses }
}
