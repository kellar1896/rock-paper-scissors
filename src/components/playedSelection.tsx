import { memo } from "react"

type PlayedSelectionProps = {
  title: string
  image?: string
}

const PlayedSelection = ({ image, title }: PlayedSelectionProps) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-700 font-bold">{title}</span>
      <img src={image} className="m-2 h-20 md:h-44" alt={`${title}_${image}`} />
    </div>
  )
}

export default memo(PlayedSelection)
