import { memo } from "react"

type ScoreLabelProps = {
  score: number
}

const ScoreLabel = ({ score }: ScoreLabelProps) => {
  const getTextColor = () => {
    if (score === 0) {
      return "text-gray-600"
    }
    if (score > 0) {
      return "text-white"
    }
    if (score < 0) {
      return "text-red-800"
    }
  }

  return (
    <div className="rounded-full w-28 h-28 border-white border-2 flex justify-center items-center">
      <p className={`text-3xl font-extrabold ${getTextColor()}`}>{score}</p>
    </div>
  )
}

export default memo(ScoreLabel)
