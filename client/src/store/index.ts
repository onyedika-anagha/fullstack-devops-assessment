import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import authReducer from "./slices/authSlice";
import formBuilderReducer from "./slices/formBuilderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    formBuilder: undoable(formBuilderReducer, {
      limit: 20, // Limit undo history to 20 actions
    }),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
