import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts"
import { assertEquals } from "https://deno.land/std@0.221.0/assert/mod.ts"
import { convertWeight, Weight, weight, WeightUnit } from "./weight.ts"

describe(convertWeight.name, () => {
  const EXAMPLES: Array<{ from: Weight; to: WeightUnit; expected: number }> = [
    { from: weight(2.2, "lb"), to: "kg", expected: 1 },
    { from: weight(1, "kg"), to: "lb", expected: 2.2 },
    { from: weight(1, "kg"), to: "kg", expected: 1 },
  ]

  for (const { from, to, expected } of EXAMPLES) {
    it(`converts ${from.value} ${from.unit} to ${expected} ${to}`, () => {
      assertEquals(convertWeight(from, to), weight(expected, to))
    })
  }
})
