import { Character } from "./data/character.ts"
import { Game } from "./data/game.ts"
import { deserializeCharacter, serializeCharacter } from "./serialize.ts"

export function loadGame(): Game {
  return {
    characters: loadCharacters(),
  }
}

export function saveCharacter(character: Character): void {
  Deno.writeTextFileSync(filename(character), serializeCharacter(character))
}

export function loadCharacters(): Character[] {
  const tomlFiles = Array.from(Deno.readDirSync(".")).filter((entry) =>
    entry.isFile && entry.name.endsWith(".toml")
  ).map((entry) => entry.name)

  return tomlFiles.map(loadCharacter)
}

function loadCharacter(path: string): Character {
  return deserializeCharacter(Deno.readTextFileSync(path))
}

function filename(character: Character): string {
  return character.name.replace(/\s+/g, "-").replace(/[^a-zA-Z-]/g, "").replace(
    /[A-Z]/g,
    (ch) => ch.toLocaleLowerCase(),
  ) + ".toml"
}
