import { ToastContent, TypeOptions, UpdateOptions } from "react-toastify";

export default function toastOption(type: TypeOptions, render: ToastContent<unknown>): UpdateOptions<unknown> {
    return { type, render, isLoading: false, autoClose: 1500 };
}
