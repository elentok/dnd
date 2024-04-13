import { convert, Currency, Money, money } from "./money.ts"
import { describe, it } from "std:bdd"
import { assertEquals } from "std:assert"

describe(convert.name, () => {
  const EXAMPLES: Array<{ from: Money; to: Currency; expected: number }> = [
    { from: money(1, "platinum"), to: "copper", expected: 1_000 },
    { from: money(1, "gold"), to: "copper", expected: 100 },
    { from: money(1, "electum"), to: "copper", expected: 50 },
    { from: money(1, "silver"), to: "copper", expected: 10 },
    { from: money(1, "copper"), to: "copper", expected: 1 },
    { from: money(2_000, "copper"), to: "platinum", expected: 2 },
    { from: money(30, "silver"), to: "gold", expected: 3 },
    { from: money(2, "electum"), to: "gold", expected: 1 },
    { from: money(2, "electum"), to: "silver", expected: 10 },
  ]

  for (const { from, to, expected } of EXAMPLES) {
    it(`converts ${from.value} ${from.currency} to ${expected} ${to}`, () => {
      assertEquals(convert(from, to), money(expected, to))
    })
  }
})
