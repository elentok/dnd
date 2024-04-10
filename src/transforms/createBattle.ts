import { abilityScoreToModifier } from "../data/abilities.ts"
import { Battle } from "../data/battle.ts"
import { Character } from "../data/character.ts"
import { roll } from "../data/dice.ts"
import { Game } from "../data/game.ts"

export function createBattle(game: Game): Battle {
  const order = game.characters.map((ch) => ({
    ch,
    initiative: rollInitiative(ch),
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

function rollInitiative(character: Character): number {
  return roll("d20") +
    abilityScoreToModifier(character.abilities.dexterity.value)
}
