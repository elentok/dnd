import { printCharacter } from "../print/character.ts"
import { loadCharacters } from "../storage.ts"

export function gameStatus() {
  const characters = loadCharacters()

  for (const character of characters) {
    printCharacter(character)
  }
}
