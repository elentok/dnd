import { abilityScoreToModifier } from "../data/abilities.ts"
import { Battle } from "../data/battle.ts"
import { Character } from "../data/character.ts"
import { roll } from "../data/dice.ts"
import { Game } from "../data/game.ts"

export interface CreateBattleOptions {
  /**
   * Initiative rolls mapped by player name (if a player has no roll the
   * function will roll for them).
   */
  initiativeRolls?: Record<string, number>
}

export function createBattle(
  game: Game,
  options: CreateBattleOptions = {},
): Battle {
  const order = game.characters.map((ch) => ({
    ch,
    initiative: getOrRollInitiative(ch, options.initiativeRolls),
  })).sort((a, b) => b.initiative - a.initiative)

  const initiativeRolls: Record<string, number> = order.reduce(
    (acc, { ch, initiative }) => {
      acc[ch.name] = initiative
      return acc
    },
    {} as Record<string, number>,
  )

  return {
    initiativeRolls,
    order: order.map((x) => x.ch),
  }
}

function getOrRollInitiative(
  character: Character,
  initiativeRolls?: Record<string, number>,
): number {
  const initiative = initiativeRolls?.[character.name]
  return initiative != null ? initiative : rollInitiative(character)
}

function rollInitiative(character: Character): number {
  return roll("d20") +
    abilityScoreToModifier(character.abilities.dexterity.value)
}
