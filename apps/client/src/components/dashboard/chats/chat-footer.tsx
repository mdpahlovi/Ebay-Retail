/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "react-router-dom";
import { CREATE_MESSAGE } from "@/graphql/mutations";

import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { Mic, MicOff, SendHorizontal, Smile } from "lucide-react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function ChatFooter() {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState("");
    const [createMessage] = useMutation(CREATE_MESSAGE);
    const { theme } = useAppSelector((state) => state.theme);
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => setContent((previous) => previous + transcript), [transcript]);

    const handleSentMessage = () => {
        const message = { id: searchParams.get("room"), type: "text", content };
        createMessage({ variables: message }).then(() => setContent(""));
    };

    return (
        <Popover>
            <div className="z-20 sticky bottom-0 bg-background border-t py-5">
                <div className="relative flex">
                    <div className="absolute top-1 left-1">
                        {listening ? (
                            <IconButton
                                onClick={() => {
                                    SpeechRecognition.stopListening();
                                    resetTranscript();
                                }}
                            >
                                <MicOff size={16} />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    if (!browserSupportsSpeechRecognition) {
                                        toast.error("Oops! Not Supported For Your Browser");
                                    } else {
                                        SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
                                    }
                                }}
                            >
                                <Mic size={16} />
                            </IconButton>
                        )}
                    </div>
                    <Input
                        value={content}
                        className="pl-10 pr-[9.25rem]"
                        placeholder="Write Your Message!"
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="absolute top-1 right-1 space-x-1">
                        <IconButton trigger>
                            <Smile size={16} />
                        </IconButton>
                        <IconButton onClick={handleSentMessage} disabled={!content} message>
                            <SendHorizontal size={16} />
                        </IconButton>
                    </div>
                </div>
            </div>
            <PopoverContent className="mr-6 border-none rounded-lg flex justify-end p-0">
                <EmojiPicker
                    height={384}
                    /* @ts-ignore */
                    theme={theme}
                    /* @ts-ignore */
                    emojiStyle="google"
                    previewConfig={{ showPreview: false }}
                    onEmojiClick={({ emoji }) => setContent((previous) => previous + emoji)}
                />
            </PopoverContent>
        </Popover>
    );
}
