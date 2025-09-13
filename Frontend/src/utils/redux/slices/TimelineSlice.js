// timelineSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  penPx: 0,
  dragging: false,
  draggedWord: null,
  dragOffset: 0,
  resizing: { wordId: null, edge: null },
};

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    startDragging(state, action) {
      state.dragging = true;
      state.penPx = action.payload;
    },
    movePen(state, action) {
      state.penPx = action.payload;
    },
    stopDragging(state) {
      state.dragging = false;
    },

    startWordDrag(state, action) {
      state.draggedWord = action.payload.word;
      state.dragOffset = action.payload.offset;
    },
    updateWordDrag(state, action) {
      if (state.draggedWord) {
        state.draggedWord.startTime = action.payload.startTime;
        state.draggedWord.endTime = action.payload.endTime;
      }
    },
    finalizeWordDrag(state) {
      state.draggedWord = null;
      state.dragOffset = 0;
    },

    startResizing(state, action) {
      state.resizing = action.payload;
    },
    updateResizing(state, action) {
      // word resizing logic update
    },
    stopResizing(state) {
      state.resizing = { wordId: null, edge: null };
    },
  },
});

export const {
  startDragging,
  movePen,
  stopDragging,
  startWordDrag,
  updateWordDrag,
  finalizeWordDrag,
  startResizing,
  updateResizing,
  stopResizing,
} = timelineSlice.actions;

export default timelineSlice.reducer;
