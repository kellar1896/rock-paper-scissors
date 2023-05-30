import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface GameCounterState {
  score: number
}

const initialState: GameCounterState = {
  score: 0,
}

export const gameCounterSlice = createSlice({
  name: "gameCounter",
  initialState,
  reducers: {
    increment: (state) => {
      state.score += 1
    },
    decrement: (state) => {
      state.score -= 1
    },
  },
})

export const { increment, decrement } = gameCounterSlice.actions
export const selectGameScore = (state: RootState) => state.counter.score

export default gameCounterSlice.reducer
