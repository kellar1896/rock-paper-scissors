import { createMachine } from "xstate"

type GameContext = {
  playerChoice: "rock" | "paper" | "scissors" | null
  computerChoice: "rock" | "paper" | "scissors" | null
  result: "win" | "lose" | "draw" | null
}

type GameEvent = { type: "PLAY"; playerChoice: "rock" | "paper" | "scissors" }

const gameMachine = createMachine(
  {
    id: "game",
    initial: "idle",
    context: {
      playerChoice: null,
      computerChoice: null,
      result: null,
    },
    states: {
      idle: {
        on: {
          PLAY: {
            target: "playing",
            actions: ["setPlayerChoice"],
          },
        },
      },
      playing: {
        on: {
          "": [
            { target: "win", cond: "playerWins" },
            { target: "lose", cond: "playerLoses" },
            { target: "draw" },
          ],
        },
      },
      win: {
        on: {
          PLAY: {
            target: "playing",
            actions: ["setPlayerChoice"],
          },
        },
      },
      lose: {
        on: {
          PLAY: {
            target: "playing",
            actions: ["setPlayerChoice"],
          },
        },
      },
      draw: {
        on: {
          PLAY: {
            target: "playing",
            actions: ["setPlayerChoice"],
          },
        },
      },
    },
  },
  {
    actions: {
      setPlayerChoice: (context: GameContext, event: GameEvent) => {
        context.playerChoice = event.playerChoice
      },
      setComputerChoice: (context: GameContext) => {
        const choices = ["rock", "paper", "scissors"]
        const randomIndex = Math.floor(Math.random() * choices.length)
        context.computerChoice = choices[randomIndex] as
          | "rock"
          | "paper"
          | "scissors"
      },
      calculateResult: (context: GameContext) => {
        const { playerChoice, computerChoice } = context

        if (playerChoice === computerChoice) {
          context.result = "draw"
        } else if (
          (playerChoice === "rock" && computerChoice === "scissors") ||
          (playerChoice === "paper" && computerChoice === "rock") ||
          (playerChoice === "scissors" && computerChoice === "paper")
        ) {
          context.result = "win"
        } else {
          context.result = "lose"
        }
      },
    },
    guards: {
      playerWins: (context: GameContext) => context.result === "win",
      playerLoses: (context: GameContext) => context.result === "lose",
    },
  },
)

export default gameMachine
