import { createCharacter } from "../data/character.ts"
import { printCharacter } from "../print/character.ts"
import { saveCharacter } from "../storage.ts"

export function addChar(name: string) {
  const character = createCharacter({ name })
  printCharacter(character)
  saveCharacter(character)
}
