import { Abilities } from "./abilities.ts"
import { Klass } from "./klass.ts"
import { Race } from "./race.ts"
import { Score } from "./score.ts"

export interface Character {
  /**
   * Experience Points
   */
  xp: number

  level: number
  name: string

  hitPoints: Score
  abilities: Abilities
  klass: Klass
  race: Race

  armorClass?: Score
}
