export type Currency = "copper" | "silver" | "electum" | "gold" | "platinum"

const VALUE_IN_COPPER: Record<Currency, number> = {
  copper: 1,
  silver: 10,
  electum: 50,
  gold: 100,
  platinum: 1000,
}

export interface Money {
  value: number
  currency: Currency
}

export function money(value: number, currency: Currency): Money {
  return { value, currency }
}

export function convert(from: Money, to: Currency): Money {
  const valueInCopper = VALUE_IN_COPPER[from.currency] * from.value
  return money(valueInCopper / VALUE_IN_COPPER[to], to)
}
