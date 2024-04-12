import { Battle } from "../data/battle.ts"

export function printBattle(battle: Battle) {
  console.info("Order:")
  battle.order.forEach((character, index) => {
    const initiative = battle.initiativeRolls[character.name]
    console.info(`${index + 1}. ${character.name} (initiative: ${initiative})`)
  })
}
