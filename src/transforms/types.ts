import { Character } from "../data/character.ts"

export interface TransformResult {
  character: Character
  notes?: string[]
}
