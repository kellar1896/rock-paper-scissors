import { useMachine } from "@xstate/react"
import gameMachine from "../../app/gameMachine"
import { useCallback, useState } from "react"
import rock from "../../assets/rock.png"
import paper from "../../assets/paper.png"
import scissors from "../../assets/scissors.png"
import ScoreLabel from "../../components/scoreLabel"
import PlayedSelection from "../../components/playedSelection"
import { getGameOverLabel } from "../../provider/tools"

const choices = [
  {
    value: "rock",
    image: rock,
  },
  {
    value: "paper",
    image: paper,
  },
  {
    value: "scissors",
    image: scissors,
  },
]

const GameCounter = () => {
  const [current, send] = useMachine(gameMachine)
  const [playerChoice, setPlayerChoice] = useState("")

  const handlePlay = useCallback((choice: string) => {
    setPlayerChoice(choice)
    send({ type: "PLAY", playerChoice: choice })
  }, [])

  const handleRestart = useCallback(() => {
    setPlayerChoice("")
    send("RESTART")
  }, [])

  const getSelectionImage = useCallback((choice: string | null) => {
    if (choice !== null) return choices.find((e) => e.value === choice)?.image
  }, [])

  return (
    <div className="h-full w-wull bg-teal-500 flex flex-col justify-center items-center">
      <h1 className="text-white font-bold text-lg md:text-4xl">
        Rock Paper Scissors
      </h1>

      {current.matches("idle") && (
        <div className="flex flex-col justify-center items-center">
          <p>Choose your move:</p>

          <div className="flex">
            {choices.map((choice) => (
              <button
                key={choice.value}
                onClick={() => handlePlay(choice.value)}
              >
                <img
                  src={choice.image}
                  className="m-2  h-20 md:h-44"
                  alt={`choice_${choice.value}`}
                />
              </button>
            ))}
          </div>
        </div>
      )}
      {current.value === "win" ||
      current.value === "lose" ||
      current.value === "draw" ? (
        <div className="flex flex-col items-center">
          <div className="flex">
            <PlayedSelection
              title="You played:"
              image={getSelectionImage(playerChoice)}
            />
            <PlayedSelection
              title="Computer played:"
              image={getSelectionImage(current.context.computerChoice)}
            />
          </div>
          <p className="text-4xl text-white font-extrabold my-2">
            {getGameOverLabel(current.context.result)}
          </p>
          <button
            onClick={handleRestart}
            className="text-white hover:cursor-pointer hover:underline text-2xl"
          >
            Play again?
          </button>
        </div>
      ) : null}
      <br />
      <ScoreLabel score={current.context.score} />
    </div>
  )
}

export default GameCounter
