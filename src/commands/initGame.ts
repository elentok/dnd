import { createCharacter } from "../transforms/createCharacter.ts"
import { printCharacter } from "../print/character.ts"
import { saveCharacter } from "../storage.ts"

export function initGame() {
  const character = createCharacter()
  printCharacter(character)
  saveCharacter(character)
}
