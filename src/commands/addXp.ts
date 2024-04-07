import { pickCharacter } from "../pickers.ts"
import { printCharacter } from "../print/character.ts"
import { addXp } from "../transforms/addXp.ts"

export async function addXpCommand(
  amount: number,
  characterQuery?: string,
): Promise<void> {
  const originalCharacter = await pickCharacter(characterQuery)
  if (originalCharacter == null) return

  const character = addXp(originalCharacter, amount)
  printCharacter(character)
}
