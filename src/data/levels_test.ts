import { assertEquals } from "std:assert"
import { getLevel } from "./levels.ts"
import { describe, it } from "std:bdd"

describe(getLevel.name, () => {
  const examples: Array<{ xp: number; level: number }> = [
    { xp: 0, level: 1 },
    { xp: 100, level: 1 },
    { xp: 300, level: 2 },
    { xp: 900, level: 3 },
    { xp: 64_000, level: 10 },
  ]

  examples.forEach(({ xp, level }) => {
    it(`returns level ${level} for ${xp} XP`, () => {
      assertEquals(getLevel(xp), level)
    })
  })
})
