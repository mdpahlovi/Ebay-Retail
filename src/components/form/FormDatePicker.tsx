import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormDatePickerProps } from "@/types/form";
import { useField, useFormikContext } from "formik";
import ErrorMassage from "./ErrorMassage";

export default function FormDatePicker({ name, label, placeholder, disabled }: FormDatePickerProps) {
    const [{ value }, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const date = value ? value : new Date();
    return (
        <div>
            <Label htmlFor={name} className="block mb-2">
                {label}
            </Label>
            <Popover>
                <PopoverTrigger disabled={disabled} asChild>
                    <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={(date) => setFieldValue(name, date)} initialFocus />
                </PopoverContent>
            </Popover>
            <ErrorMassage meta={meta} />
        </div>
    );
}
