import { printCharacter } from "../print/character.ts"
import { saveCharacter } from "../storage.ts"
import { createCharacter } from "../transforms/createCharacter.ts"

export function addChar(name: string) {
  const character = createCharacter({ name })
  printCharacter(character)
  saveCharacter(character)
}
