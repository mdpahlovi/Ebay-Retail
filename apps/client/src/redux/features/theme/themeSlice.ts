import { Theme } from "@/types/theme";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { theme: Theme } = { theme: undefined };

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<"dark" | "light">) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
