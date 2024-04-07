export interface Score {
  value: number
  baseValue: number
  bonuses: Bonus[]
}

export interface Bonus {
  source: string
  value: number
}

export function createScore(baseValue: number, bonuses: Bonus[] = []) {
  const value = baseValue + bonuses.reduce((sum, bonus) => sum + bonus.value, 0)
  return { baseValue, value, bonuses: [...bonuses] }
}

export function addBonus(score: Score, bonus: Bonus): Score {
  return {
    ...score,
    bonuses: [...score.bonuses, bonus],
    value: score.value + bonus.value,
  }
}
