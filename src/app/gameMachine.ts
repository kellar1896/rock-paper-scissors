import { createMachine } from "xstate"
import { GameChoice, ResultGame } from "./types"

type GameContext = {
  playerChoice: GameChoice
  computerChoice: GameChoice
  result: ResultGame
  score: number
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
      score: 0,
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
        entry: ["setComputerChoice", "calculateResult"],
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
          RESTART: "idle",
        },
      },
      lose: {
        on: {
          RESTART: "idle",
        },
      },
      draw: {
        on: {
          RESTART: "idle",
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
        context.computerChoice = choices[randomIndex] as GameChoice
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
          context.score += 1
        } else {
          context.result = "lose"
          context.score -= 1
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
