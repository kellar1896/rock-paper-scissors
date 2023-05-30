import { ResultGame } from "../app/types"

export const getGameOverLabel = (result: ResultGame) => {
  switch (result) {
    case "win":
      return "You win"
    case "lose":
      return "You lose"
    case "draw":
      return "You Tied"
    default:
      return ""
  }
}
