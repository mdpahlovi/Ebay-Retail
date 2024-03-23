import { UserToken } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: UserToken | null; loading: boolean } = { user: null, loading: true };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserToken | null>) => {
            state.user = action.payload;
            state.loading = false;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
