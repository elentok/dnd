import { pickArmor, pickCharacter } from "../pickers.ts"
import { printCharacter } from "../print/character.ts"
import { saveCharacter } from "../storage.ts"
import { equipArmor, removeArmor } from "../transforms/equipArmor.ts"

export async function setArmor() {
  const character = await pickCharacter()
  if (character == null) return

  const armor = await pickArmor()
  const updatedCharacter = (armor == null)
    ? removeArmor(character)
    : equipArmor(character, armor)
  saveCharacter(updatedCharacter)
  printCharacter(updatedCharacter)
}
