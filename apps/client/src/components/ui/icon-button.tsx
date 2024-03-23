import { PropsWithChildren } from "react";
import { PopoverTrigger } from "./popover";
import { Button, ButtonProps } from "./button";

type IconButtonProps = { onClick?: () => void; message?: boolean; trigger?: boolean; disabled?: boolean };

export function IconButton({ children, onClick, message, trigger, disabled }: IconButtonProps & PropsWithChildren) {
    const props: ButtonProps = {
        variant: message ? "default" : "outline",
        size: "icon",
        className: "w-8 h-8 rounded-full",
        onClick,
        disabled,
    };

    return trigger ? (
        <PopoverTrigger asChild>
            <Button {...props}>{children}</Button>
        </PopoverTrigger>
    ) : (
        <Button {...props}>{children}</Button>
    );
}
