import { Abilities } from "./abilities.ts"
import { Klass } from "./klass.ts"
import { Race } from "./race.ts"
import { Score } from "./score.ts"

/**
 * The base armor class when there is no armor equipped.
 */
export const BASE_ARMOR_CLASS = 10

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

  armorClass: Score
}
