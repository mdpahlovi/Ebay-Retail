import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CallStage = "sent" | "incoming" | "answered" | null;

interface State {
    open: boolean;
    callStage: CallStage;
    remotePeerId: string;
    currentPeerId: string;
    remoteVideo: MediaStream | undefined;
    currentVideo: MediaStream | undefined;
}

const initialState: State = {
    open: false,
    callStage: null,
    remotePeerId: "",
    currentPeerId: "",
    remoteVideo: undefined,
    currentVideo: undefined,
};

const videoSlice = createSlice({
    name: "videoSlice",
    initialState,
    reducers: {
        setOpen(state, action: PayloadAction<boolean>) {
            state.open = action.payload;
        },
        setCallStage(state, action: PayloadAction<CallStage>) {
            state.callStage = action.payload;
        },
        setRemotePeerId(state, action: PayloadAction<string>) {
            state.remotePeerId = action.payload;
        },
        setCurrentPeerId(state, action: PayloadAction<string>) {
            state.currentPeerId = action.payload;
        },
        setRemoteVideo(state, action: PayloadAction<MediaStream | undefined>) {
            state.remoteVideo = action.payload;
        },
        setCurrentVideo(state, action: PayloadAction<MediaStream | undefined>) {
            state.currentVideo = action.payload;
        },
    },
});

export const { setOpen, setCallStage, setRemotePeerId, setCurrentPeerId, setRemoteVideo, setCurrentVideo } = videoSlice.actions;

export default videoSlice.reducer;
