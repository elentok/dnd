import { assertEquals } from "https://deno.land/std@0.221.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.221.0/testing/bdd.ts"
import { calculateArmorClass } from "./calculateArmorClass.ts"
import { fromPartial } from "npm:@total-typescript/shoehorn"

describe(calculateArmorClass.name, () => {
  describe("without armor", () => {
    it("returns 10 + dexterity modifier", () => {
      const armorClass = calculateArmorClass(
        fromPartial({ dexterity: { value: 14 } }),
      )
      assertEquals(armorClass, {
        value: 12,
        baseValue: 10,
        bonuses: [{
          value: 2,
          source: {
            type: "ability",
            ability: "dexterity",
          },
        }],
      })
    })
  })

  describe("with armor", () => {
    describe("when includeDexterity is false", () => {
      it("only uses the armor's armorClass", () => {
        const armorClass = calculateArmorClass(
          fromPartial({ dexterity: { value: 14 } }),
          fromPartial({ includeDexterity: false, armorClass: 40 }),
        )
        assertEquals(armorClass, {
          value: 40,
          baseValue: 40,
          bonuses: [],
        })
      })
    })

    describe("when includeDexterity is true", () => {
      describe("when maxDexterity is defined", () => {
        describe("when dexterity higher than maxDexterity", () => {
          it("only uses the armor's armorClass", () => {
            const armorClass = calculateArmorClass(
              fromPartial({ dexterity: { value: 14 } }),
              fromPartial({
                includeDexterity: true,
                maxDexterity: 1,
                armorClass: 40,
              }),
            )
            assertEquals(armorClass, {
              value: 40,
              baseValue: 40,
              bonuses: [],
            })
          })
        })
        describe("when dexterity less than maxDexterity", () => {
          it("includes the dexterity bonus", () => {
            const armorClass = calculateArmorClass(
              fromPartial({ dexterity: { value: 14 } }),
              fromPartial({
                includeDexterity: true,
                maxDexterity: 3,
                armorClass: 20,
              }),
            )
            assertEquals(armorClass, {
              value: 22,
              baseValue: 20,
              bonuses: [{
                value: 2,
                source: {
                  type: "ability",
                  ability: "dexterity",
                },
              }],
            })
          })
        })
      })

      describe("when maxDexterity is not defined", () => {
        it("includes the dexterity bonus", () => {
          const armorClass = calculateArmorClass(
            fromPartial({ dexterity: { value: 14 } }),
            fromPartial({ includeDexterity: true, armorClass: 20 }),
          )
          assertEquals(armorClass, {
            value: 22,
            baseValue: 20,
            bonuses: [{
              value: 2,
              source: {
                type: "ability",
                ability: "dexterity",
              },
            }],
          })
        })
      })
    })
  })
})
