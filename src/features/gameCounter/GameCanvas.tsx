import { Stage, Sprite, Container, Text } from "@pixi/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import rock from "../../assets/rock.png"
import paper from "../../assets/paper.png"
import scissors from "../../assets/scissors.png"
import GameHeader from "../../components/gameHeader"
import GameScore from "../../components/gameScore"
import { useMachine } from "@xstate/react"
import gameMachine from "../../app/gameMachine"
import { TextStyle, Sprite as PixiSprite, Ticker } from "pixi.js"
import { getGameOverLabel } from "../../provider/tools"

const height = window.innerHeight
const width = window.innerWidth

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

class CustomSprite extends PixiSprite {
  initialY: number = 0
}

const GameCanvas = () => {
  const isMobile = useMemo(() => width <= 768, [])

  const spriteSize = isMobile ? 50 : 200
  const [current, send] = useMachine(gameMachine)
  const [playerChoice, setPlayerChoice] = useState("")

  const handlePlay = useCallback((choice: string) => {
    setPlayerChoice(choice)
    send({ type: "PLAY", playerChoice: choice })
  }, [])

  const handleRestart = useCallback(() => {
    send("RESTART")
    setPlayerChoice("")
  }, [])

  const getSelectionImage = useCallback((choice: string | null) => {
    if (choice !== null) return choices.find((e) => e.value === choice)?.image
  }, [])

  const playerSpriteRef = useRef<CustomSprite>(null)
  const computerSpriteRef = useRef<CustomSprite>(null)

  const animateBounce = useCallback((lastTime: number) => {
    const playerSprite = playerSpriteRef.current
    const computerSprite = computerSpriteRef.current

    if (playerSprite && computerSprite) {
      const originalY = playerSprite.y
      const speed = 0.005
      playerSprite.y = originalY + Math.sin(lastTime * speed) * 1.2
      computerSprite.y = originalY + Math.sin(lastTime * speed) * 1.2
    }
  }, [])

  useEffect(() => {
    const ticker = new Ticker()

    ticker.add(() => animateBounce(ticker.lastTime))
    ticker.start()

    return () => {
      ticker.stop()
      ticker.destroy()
    }
  }, [current.value, animateBounce])

  return (
    <Stage
      height={height}
      width={width}
      options={{ backgroundColor: 0x14b8a6 }}
    >
      <GameHeader />
      {current.matches("idle") && (
        <>
          <Sprite
            image={rock}
            x={width / 2 - spriteSize * 1.2}
            y={height / 2}
            anchor={{ x: 0.5, y: 0.5 }}
            width={spriteSize}
            height={spriteSize}
            interactive={true}
            pointerdown={() => handlePlay("rock")}
          />
          <Sprite
            image={paper}
            x={width / 2}
            y={height / 2}
            anchor={{ x: 0.5, y: 0.5 }}
            width={spriteSize * 1.2}
            height={spriteSize * 1.1}
            interactive={true}
            pointerdown={() => handlePlay("paper")}
          />

          <Sprite
            image={scissors}
            x={width / 2 + spriteSize * 1.2}
            y={height / 2}
            anchor={{ x: 0.5, y: 0.5 }}
            width={spriteSize * 0.8}
            height={spriteSize}
            interactive={true}
            pointerdown={() => handlePlay("scissors")}
          />
        </>
      )}
      {current.value === "win" ||
      current.value === "lose" ||
      current.value === "draw" ? (
        <Container y={height / 2} x={width / 2}>
          <Text
            text="You played:"
            y={isMobile ? -50 : -120}
            x={isMobile ? -40 : -120}
            anchor={{ x: 0.5, y: 0.5 }}
            style={
              new TextStyle({
                fill: "#374151",
                fontWeight: "600",
                fontSize: isMobile ? 10 : 20,
              })
            }
          />
          <Text
            text="Computer played:"
            y={isMobile ? -50 : -120}
            x={isMobile ? 40 : 120}
            anchor={{ x: 0.5, y: 0.5 }}
            style={
              new TextStyle({
                fill: "#374151",
                fontWeight: "600",
                fontSize: isMobile ? 10 : 20,
              })
            }
          />
          <Sprite
            image={getSelectionImage(playerChoice)}
            x={isMobile ? -30 : -120}
            y={20}
            anchor={{ x: 0.5, y: 0.5 }}
            width={spriteSize}
            height={spriteSize}
            interactive={true}
            ref={playerSpriteRef}
          />
          <Sprite
            image={getSelectionImage(current.context.computerChoice)}
            x={isMobile ? 30 : 120}
            y={20}
            anchor={{ x: 0.5, y: 0.5 }}
            width={spriteSize}
            height={spriteSize}
            interactive={true}
            ref={computerSpriteRef}
          />
          <Text
            text={getGameOverLabel(current.context.result)}
            y={isMobile ? 40 : 150}
            x={0.5}
            anchor={{ x: 0.5, y: 0.5 }}
            style={
              new TextStyle({
                fill: "#fff",
                fontWeight: "600",
                fontSize: isMobile ? 20 : 40,
              })
            }
          />
          <Text
            text="Play again?"
            y={isMobile ? 50 : 180}
            x={0.5}
            anchor={{ x: 0.5, y: 0.5 }}
            style={
              new TextStyle({
                fill: "#fff",
                fontWeight: "600",
                fontSize: isMobile ? 15 : 20,
              })
            }
            interactive={true}
            pointerdown={handleRestart}
          />
        </Container>
      ) : null}
      <GameScore
        x={width / 2}
        y={(height / 2) * 1.7}
        radius={isMobile ? 30 : 50}
        score={current.context.score}
      />
    </Stage>
  )
}

export default GameCanvas
