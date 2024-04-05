import { abilityPrettyName } from "./abilities.ts"
import { racePrettyName } from "./race.ts"

function main() {
  console.log(abilityPrettyName("wisdom"))
  console.log(racePrettyName("half-elf"))
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  main()
}
