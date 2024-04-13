import { Character } from "./data/character.ts"
import { Armor, ARMORS } from "./data/equipment/armor.ts"
import { fzf } from "./helpers/fzf.ts"
import { loadCharacters } from "./storage.ts"

export async function pickCharacters(
  query?: string,
): Promise<Character[]> {
  const characters = filterCharacters(query)
  const results = await fzf({
    items: characters.map((ch) => ch.name),
    allowMultiple: true,
  })
  return characters.filter((ch) => results.includes(ch.name))
}

export async function pickCharacter(
  query?: string,
): Promise<Character | undefined> {
  const characters = filterCharacters(query)
  const results = await fzf({ items: characters.map((ch) => ch.name) })
  return characters.find((ch) => ch.name === results[0])
}

export async function pickArmor(): Promise<Armor | undefined> {
  const results = await fzf({
    items: ["No armor", ...ARMORS.map((armor) => armor.name)],
  })
  if (results.length !== 1) return
  if (results[0] === "No armor") return

  return ARMORS.find((armor) => armor.name === results[0])
}

function filterCharacters(query?: string): Character[] {
  const lowercaseQuery = query?.toLocaleLowerCase()
  const characters = loadCharacters()
  return lowercaseQuery == null
    ? characters
    : characters.filter((c) =>
      c.name.toLocaleLowerCase().indexOf(lowercaseQuery) !== -1
    )
}
