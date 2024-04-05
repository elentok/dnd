export type Dice = "d4" | "d6" | "d8" | "d10" | "d12" | "d20"

const DiceToValue = new Map<Dice, number>([
  ["d4", 4],
  ["d6", 6],
  ["d8", 8],
  ["d10", 10],
  ["d12", 12],
  ["d20", 20],
])

export function diceValue(dice: Dice): number {
  const value = DiceToValue.get(dice)
  if (value == null) throw new Error(`Invalid dice '${dice}'`)
  return value
}

export function roll(dice: Dice): number {
  return Math.ceil(Math.random() * diceValue(dice))
}
