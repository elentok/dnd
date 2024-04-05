import { Command } from "npm:commander@11.1.0"

const program = new Command()
program.command("init").description(
  "Initialises a new game in the current directory",
)
  .action(initGame)

program.parse()
