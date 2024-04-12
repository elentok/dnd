import { printBattle } from "../print/battle.ts"
import { loadGame } from "../storage.ts"
import { createBattle } from "../transforms/createBattle.ts"

export function startBattle() {
  const game = loadGame()
  const battle = createBattle(game)

  printBattle(battle)
}
