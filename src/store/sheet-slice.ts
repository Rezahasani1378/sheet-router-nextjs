import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StackEntry } from "@rezahasani78/sheet-router";

interface SheetState {
  stack: StackEntry[];
}

const initialState: SheetState = {
  stack: [],
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    setStack(state, action: PayloadAction<StackEntry[]>) {
      state.stack = action.payload;
    },
    clearStack(state) {
      state.stack = [];
    },
  },
});

export const { setStack, clearStack } = sheetSlice.actions;
export default sheetSlice.reducer;
