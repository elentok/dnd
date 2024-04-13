import { assertEquals } from "std:assert"
import { describe, it } from "std:bdd"
import { racePrettyName } from "./race.ts"

describe(racePrettyName.name, () => {
  it("prettifies the name", () => {
    assertEquals(racePrettyName("halfElf"), "Half Elf")
  })
})
