import { Character } from "./character.ts"

export interface Battle {
  /**
   * Initiative rolls mapped by player name.
   */
  initiativeRolls: Record<string, number>
  order: Character[]
  // rounds: BattleRound[]
}

// export interface BattleRound {
// }
