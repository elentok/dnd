export type WeightUnit = "lb" | "kg"

const VALUE_IN_LB: Record<WeightUnit, number> = {
  lb: 1,
  kg: 2.2,
}

export interface Weight {
  value: number
  unit: WeightUnit
}

export function weight(value: number, unit: WeightUnit): Weight {
  return { value, unit }
}

export function convertWeight(from: Weight, to: WeightUnit): Weight {
  const valueInLb = VALUE_IN_LB[from.unit] * from.value
  return weight(valueInLb / VALUE_IN_LB[to], to)
}
