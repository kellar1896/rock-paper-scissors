import { memo } from "react"
import * as PIXI from "pixi.js"
import { Container, Text } from "@pixi/react"

const height = window.innerHeight
const width = window.innerWidth
const isMobile = width <= 768
const GameHeader = () => {
  return (
    <Container x={width / 2} y={(height / 2) * 0.5}>
      <Text
        text="Rock Paper Scissors"
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          new PIXI.TextStyle({
            fill: "#fff",
            fontWeight: "800",
            fontSize: isMobile ? 20 : 40,
          })
        }
      />
      <Text
        text="Choose your move:"
        y={isMobile ? 20 : 40}
        anchor={{ x: 0.5, y: 0.5 }}
        style={
          new PIXI.TextStyle({
            fill: "#000",
            fontWeight: "300",
            fontSize: isMobile ? 15 : 20,
          })
        }
      />
    </Container>
  )
}

export default memo(GameHeader)
