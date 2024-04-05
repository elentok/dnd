export const XP_BY_LEVEL: number[] = [
  -1, // 0
  0, // 1
  300,
  900,
  2_700,
  6_500,
  14_000,
  23_000,
  34_000,
  48_000,
  64_000, // 10
  85_000,
  100_000,
  120_000,
  140_000,
  165_000,
  195_000,
  225_000,
  265_000,
  305_000,
  355_000, // 20
]

export function getLevel(xp: number): number {
  for (let level = 2; level < XP_BY_LEVEL.length; level++) {
    if (xp < XP_BY_LEVEL[level]) {
      return level - 1
    }
  }

  return XP_BY_LEVEL[XP_BY_LEVEL.length - 1]
}
