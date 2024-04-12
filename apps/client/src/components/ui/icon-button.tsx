import { PopoverTrigger } from "./popover";
import { Button, ButtonProps } from "./button";

export function IconButton({
    children,
    className,
    size = "icon",
    variant = "outline",
    trigger,
    ...restProps
}: { trigger?: boolean } & ButtonProps) {
    const props = { className: `size-8 ${className}`, size, variant, ...restProps };

    return trigger ? (
        <PopoverTrigger asChild>
            <Button {...props}>{children}</Button>
        </PopoverTrigger>
    ) : (
        <Button {...props}>{children}</Button>
    );
}
