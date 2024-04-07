import { pickCharacters } from "../pickers.ts"
import { saveCharacter } from "../storage.ts"
import { addXp } from "../transforms/addXp.ts"

export async function addXpCommand(
  amount: string,
  characterQuery?: string,
): Promise<void> {
  const amountNumber = Number(amount)
  if (isNaN(amountNumber)) {
    console.error(`Invalid amount value ${amount}`)
  }

  const characters = await pickCharacters(characterQuery)
  for (const originalCharacter of characters) {
    const { character, notes } = addXp(originalCharacter, amountNumber)
    saveCharacter(character)
    if (notes != null) {
      console.info()
      console.info(character.name)
      for (const note of notes) {
        console.info(`- ${note}`)
      }
    }
  }
}
