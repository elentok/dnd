import { assertEquals } from "https://deno.land/std@0.221.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts"
import { deserializeBonus, deserializeBonusSource } from "./serialize.ts"

describe(deserializeBonusSource.name, () => {
  it("deserializes race bonus", () => {
    assertEquals(deserializeBonusSource("race"), { type: "race" })
  })

  it("deserializes ability bonus", () => {
    assertEquals(deserializeBonusSource("ability:dexterity"), {
      type: "ability",
      ability: "dexterity",
    })
  })
})

describe(deserializeBonus.name, () => {
  it("deserializes positive bonuses", () => {
    assertEquals(deserializeBonus("+1 (ability:constitution)"), {
      value: 1,
      source: { type: "ability", ability: "constitution" },
    })
  })

  it("deserializes negative bonuses", () => {
    assertEquals(deserializeBonus("-2 (ability:constitution)"), {
      value: -2,
      source: { type: "ability", ability: "constitution" },
    })
  })
})
