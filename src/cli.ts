import { Command } from "npm:commander@11.1.0"

const program = new Command()
program.command("init").description(
  "Initialises a new game in the current directory",
).action(async () => {
  const { initGame } = await import("./commands/initGame.ts")
  initGame()
})

program.command("status").description("Shows the game status").action(
  async () => {
    const { gameStatus } = await import("./commands/status.ts")
    gameStatus()
  },
)

program.command("add-char <name>").description("Adds a character").action(
  async (name: string) => {
    const { addChar } = await import("./commands/addChar.ts")
    addChar(name)
  },
)

program.command("add-xp <amount> [query]").description("Adds XP to a character")
  .action(
    async (amount: string, characterQuery?: string) => {
      const { addXpCommand } = await import("./commands/addXp.ts")
      addXpCommand(amount, characterQuery)
    },
  )

program.command("set-armor").description("Sets a character's armor")
  .action(
    async () => {
      const { setArmor } = await import("./commands/setArmor.ts")
      setArmor()
    },
  )

program.command("battle").description("Starts a battle")
  .action(
    async () => {
      const { startBattle } = await import("./commands/startBattle.ts")
      startBattle()
    },
  )

program.parse()
