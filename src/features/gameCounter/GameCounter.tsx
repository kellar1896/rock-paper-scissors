import { useMachine } from "@xstate/react"
import gameMachine from "../../app/gameMachine"
import { useCallback, useState } from "react"

const choices = ["rock", "paper", "scissors"]

const GameCounter = () => {
  const [current, send] = useMachine(gameMachine)
  const [playerChoice, setPlayerChoice] = useState("")

  const handlePlay = useCallback((choice: string) => {
    setPlayerChoice(choice)
    send({ type: "PLAY", playerChoice: choice })
  }, [])

  return (
    <div>
      <h1>Rock Paper Scissors</h1>

      {current.matches("idle") && (
        <div>
          <p>Choose your move:</p>
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handlePlay(choice)}
              className="bg-blue-300 m-5"
            >
              {choice}
            </button>
          ))}
        </div>
      )}
      {current.context.result}
    </div>
  )
}

export default GameCounter
