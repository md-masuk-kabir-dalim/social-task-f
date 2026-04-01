import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AlertState {
  message: string | null
  type: "success" | "error" | "info" | "warning" | null
}

const initialState: AlertState = {
  message: null,
  type: null,
}

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<{ message: string; type: AlertState["type"] }>) => {
      state.message = action.payload.message
      state.type = action.payload.type
    },
    clearAlert: (state) => {
      state.message = null
      state.type = null
    },
  },
})

export const { setAlert, clearAlert } = alertSlice.actions
export const alertReducer = alertSlice.reducer
