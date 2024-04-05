import { createDefaultCharacter } from "./models/character.ts"
import { printCharacter } from "./print/character.ts"

function main() {
  const character = createDefaultCharacter()
  printCharacter(character)
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main()
}
