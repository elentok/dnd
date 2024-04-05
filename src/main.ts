import { createCharacter } from "./data/character.ts"
import { printCharacter } from "./print/character.ts"

function main() {
  const character = createCharacter()
  printCharacter(character)
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main()
}
