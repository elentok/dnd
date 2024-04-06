import { Character } from "./data/character.ts"
import { fzf } from "./helpers/fzf.ts"
import { loadCharacters } from "./storage.ts"

export async function pickCharacter(
  query?: string,
): Promise<Character | undefined> {
  const lowercaseQuery = query?.toLocaleLowerCase()
  console.log("[bazinga] [pickers.ts] pickCharacter", lowercaseQuery)
  const characters = loadCharacters()
  const filteredCharacters = lowercaseQuery == null
    ? characters
    : characters.filter((c) =>
      c.name.toLocaleLowerCase().indexOf(lowercaseQuery) !== -1
    )

  if (filteredCharacters.length === 1) {
    return filteredCharacters[0]
  }

  const results = await fzf({ items: filteredCharacters.map((ch) => ch.name) })
  console.log("[bazinga] [pickers.ts] pickCharacter", results)
  console.log("[bazinga] [pickers.ts] pickCharacter", filteredCharacters)
  return filteredCharacters.find((ch) => ch.name === results[0])
}
