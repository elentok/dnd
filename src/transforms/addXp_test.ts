import { assertEquals } from "https://deno.land/std@0.221.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts"
import { createCharacter } from "../data/character.ts"
import { addXp } from "./addXp.ts"
import { _internals } from "../data/dice.ts"
import {
  returnsNext,
  stub,
} from "https://deno.land/std@0.221.0/testing/mock.ts"

describe(addXp.name, () => {
  it("adds XP to the character", () => {
    const character = createCharacter()
    character.xp = 10

    assertEquals(addXp(character, 50).xp, 60)
  })

  describe("when reaching the next XP level", () => {
    it("levels up when reaching the next XP level", () => {
      const character = addXp(createCharacter(), 300)
      assertEquals(character.level, 2)
    })

    it("increments the hit points", () => {
      stub(_internals, "roll", returnsNext([3]))

      const originalCharacter = createCharacter()
      const character = addXp(originalCharacter, 300)

      const { value, baseValue, bonuses } = originalCharacter.hitPoints

      assertEquals(character.hitPoints, {
        ...originalCharacter.hitPoints,
        // value: 10,
        baseValue,
        value: value + 5,
        bonuses: [
          ...bonuses,
          {
            source: "1d6 roll (level up to 2)",
            value: 3,
          },
          {
            source: "Constitution Modifier (level up to 2)",
            // value: originalCharacter.abilities.get
          },
        ],
      })
    })
  })
})
