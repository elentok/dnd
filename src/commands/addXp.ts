import { pickCharacter } from "../pickers.ts"
import { printCharacter } from "../print/character.ts"
import { addXp } from "../transforms/addXp.ts"

export async function addXpCommand(
  amount: string,
  characterQuery?: string,
): Promise<void> {
  const originalCharacter = await pickCharacter(characterQuery)
  if (originalCharacter == null) return

  const amountNumber = Number(amount)
  if (isNaN(amountNumber)) {
    console.error(`Invalid amount value ${amount}`)
  }

  const character = addXp(originalCharacter, amountNumber)
  console.log("[bazinga] [addXp.ts] addXpCommand", character)
  printCharacter(character)
}
