import { assertEquals } from "std:assert"
import { describe, it } from "std:bdd"
import { addXp } from "./addXp.ts"
import { _internals } from "../data/dice.ts"
import { stub } from "std:mock"
import { createCharacter } from "./createCharacter.ts"
import { abilityScoreToModifier } from "../data/abilities.ts"

describe(addXp.name, () => {
  it("adds XP to the character", () => {
    const character = createCharacter()
    character.xp = 10

    assertEquals(addXp(character, 50).character.xp, 60)
  })

  describe("when reaching the next XP level", () => {
    it("levels up when reaching the next XP level", () => {
      const { character } = addXp(createCharacter(), 300)
      assertEquals(character.level, 2)
    })

    it("increments the hit points", () => {
      stub(_internals, "rollSingle", () => 3)

      const originalCharacter = createCharacter({
        race: "human",
        klass: "wizard", // 1d6 hit die
        baseAbilities: {
          constitution: 10,
        },
      })
      const { character } = addXp(originalCharacter, 300)

      const { value, baseValue, bonuses } = originalCharacter.hitPoints

      assertEquals(character.hitPoints, {
        ...originalCharacter.hitPoints,
        baseValue,
        value: value + 3,
        bonuses: [
          ...bonuses,
          {
            source: { type: "level-up-hit-die" },
            value: 3,
          },
          {
            source: { type: "ability", ability: "constitution" },
            value: abilityScoreToModifier(
              originalCharacter.abilities.constitution.value,
            ),
          },
        ],
      })
    })
  })
})
