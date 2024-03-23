import moment from "moment";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type DateRangeProps = { date: DateRange; setDate: React.Dispatch<React.SetStateAction<DateRange>>; className?: string };

export function DateRanger({ date, setDate, className }: DateRangeProps) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarDays size={16} className="mr-2" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {moment(date.from).format("ll")} - {moment(date.to).format("ll")}
                                </>
                            ) : (
                                moment(date.from).format("ll")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={(range) => setDate(range!)}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
