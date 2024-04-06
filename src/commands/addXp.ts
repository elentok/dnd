import { pickCharacter } from "../pickers.ts"

export async function addXp(
  amount: number,
  characterQuery?: string,
): Promise<void> {
  const character = await pickCharacter(characterQuery)

  console.log("[addXp.ts] addXp", character)
}
