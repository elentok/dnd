import { assertEquals } from "https://deno.land/std@0.221.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts"
import { addXp } from "./addXp.ts"
import { _internals } from "../data/dice.ts"
import {
  returnsNext,
  stub,
} from "https://deno.land/std@0.221.0/testing/mock.ts"
import { createCharacter } from "./createCharacter.ts"
import { abilityScoreToModifier } from "../data/abilities.ts"

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
      // stub(_internals, "rollSingle", returnsNext([3]))
      stub(_internals, "rollSingle", () => 3)

      const originalCharacter = createCharacter({
        race: "human",
        klass: "wizard", // 1d6 hit die
      })
      const character = addXp(originalCharacter, 300)

      const { value, baseValue, bonuses } = originalCharacter.hitPoints

      assertEquals(character.hitPoints, {
        ...originalCharacter.hitPoints,
        baseValue,
        value: value + 2,
        bonuses: [
          ...bonuses,
          {
            source: "1d6 roll (level up to 2)",
            value: 3,
          },
          {
            source: "Constitution Modifier (level up to 2)",
            value: abilityScoreToModifier(
              originalCharacter.abilities.constitution.value,
            ),
          },
        ],
      })
    })
  })
})
