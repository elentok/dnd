import { assertEquals } from "std:assert"
import { describe, it } from "std:bdd"
import { abilityPrettyName } from "./abilities.ts"

describe(abilityPrettyName.name, () => {
  it("prettifies the name", () => {
    assertEquals(abilityPrettyName("charisma"), "Charisma")
  })
})
