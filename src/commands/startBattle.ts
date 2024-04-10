import { loadGame } from "../storage.ts"
import { createBattle } from "../transforms/createBattle.ts"

export function startBattle() {
  const game = loadGame()
  const battle = createBattle(game)
  battle.order.forEach((character, index) => {
    console.info(
      `${index + 1}. ${character.name} (initiative:${
        battle.initiativeRolls[character.name]
      })`,
    )
  })
}
