import { useEffect } from "react";
import { toast } from "react-toastify";
import { Mic, MicOff } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

type ChatSpeechRecognitionProps = { setContent: React.Dispatch<React.SetStateAction<string>> };

export default function ChatSpeechRecognition({ setContent }: ChatSpeechRecognitionProps) {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    useEffect(() => setContent((previous) => previous + transcript), [setContent, transcript]);

    return (
        <div className="absolute top-1 left-1">
            {listening ? (
                <IconButton
                    onClick={() => {
                        resetTranscript();
                        SpeechRecognition.stopListening();
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
    );
}
