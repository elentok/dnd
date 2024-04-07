import { assertEquals } from "https://deno.land/std@0.221.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts"
import { deserializeBonus } from "./serialize.ts"

describe(deserializeBonus.name, () => {
  it("deserializes positive bonuses", () => {
    assertEquals(deserializeBonus("+1 (Constitution modifier)"), {
      value: 1,
      source: "Constitution modifier",
    })
  })

  it("deserializes negative bonuses", () => {
    assertEquals(deserializeBonus("-2 (Constitution modifier)"), {
      value: -2,
      source: "Constitution modifier",
    })
  })
})
