import { assertEquals } from "https://deno.land/std@0.204.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std/testing/bdd.ts"
import { abilityPrettyName } from "./abilities.ts"

describe(abilityPrettyName.name, () => {
  it("prettifies the name", () => {
    assertEquals(abilityPrettyName("charisma"), "Charisma")
  })
})
