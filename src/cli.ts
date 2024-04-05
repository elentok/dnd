import { Command } from "npm:commander@11.1.0"
import { initGame } from "./commands/initGame.ts"
import { gameStatus } from "./commands/status.ts"
import { addChar } from "./commands/addChar.ts"

const program = new Command()
program.command("init").description(
  "Initialises a new game in the current directory",
).action(initGame)

program.command("status").description("Shows the game status").action(
  gameStatus,
)

program.command("add-char <name>").description("Adds a character").action(
  addChar,
)

program.parse()
