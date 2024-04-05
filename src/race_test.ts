import { assertEquals } from "https://deno.land/std@0.204.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std/testing/bdd.ts"
import { racePrettyName } from "./race.ts"

describe(racePrettyName.name, () => {
  it("prettifies the name", () => {
    assertEquals(racePrettyName("half-elf"), "Half-Elf")
  })
})
