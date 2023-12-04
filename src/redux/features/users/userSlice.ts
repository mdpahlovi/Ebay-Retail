import axios from "axios";
import auth from "@/config/firebase.config";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState, IRegisterUser, ILoginUser, IUser } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const initialState: IUserState = {
    user: null,
    isLoading: false,
    isError: false,
    error: null,
};

export const createUser = createAsyncThunk("user/createUser", async ({ name, email, password }: IRegisterUser) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    if (data?.user?.email) {
        const res = await axios.post("/user", { name, email });
        return res.data;
    }
});

export const loginUser = createAsyncThunk("user/loginUser", async ({ email, password }: ILoginUser) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    if (data?.user?.email) {
        const res = await axios.get(`/user/${data.user.email}`);
        return res.data;
    }
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user = null;
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message!;
            });
    },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
