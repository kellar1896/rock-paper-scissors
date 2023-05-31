import { useApp } from "@pixi/react"
import * as PIXI from "pixi.js"
import { memo, useEffect, useMemo, useRef } from "react"

type GameScoreProps = {
  x: number
  y: number
  radius: number
  score: number
}

const GameScore = ({ x, y, radius, score = 0 }: GameScoreProps) => {
  const app = useApp()
  const scoreTextRef = useRef<PIXI.Text>()

  useEffect(() => {
    if (scoreTextRef.current) {
      scoreTextRef.current.text = score.toString()
    }
  }, [score])

  useMemo(() => {
    const graphics = new PIXI.Graphics()
    graphics.lineStyle(2, 0xffffff)
    graphics.beginFill(0x000000, 0)
    graphics.drawCircle(0, 0, radius)
    graphics.endFill()
    graphics.interactive = true
    graphics.x = x
    graphics.y = y

    const numberText = new PIXI.Text(score.toString(), {
      fontFamily: "Arial",
      fontSize: radius / 2,
      fill: "white",
      align: "center",
    })
    numberText.anchor.set(0.5)
    numberText.position.set(x, y)

    app.stage.addChild(graphics, numberText)
    scoreTextRef.current = numberText

    return () => {
      app.stage.removeChild(graphics, scoreTextRef.current!)
      graphics.destroy()
      scoreTextRef.current!.destroy()
    }
  }, [app, radius, x, y])
  return null
}

export default memo(GameScore)
