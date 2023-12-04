import UserNav from "../user-nav";
import { PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Dashboard() {
    return (
        <Sheet>
            <div className="h-screen grid lg:grid-cols-[264px_1fr]">
                <ScrollArea className="border-r hidden lg:block"></ScrollArea>
                <ScrollArea>
                    <div className="sticky top-0 h-16 bg-background border-b flex justify-between items-center gap-6 px-6">
                        <SheetTrigger>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <PanelLeftOpen size={20} />
                            </Button>
                        </SheetTrigger>
                        <div className="flex items-center gap-6">
                            <UserNav />
                            <ModeToggle />
                        </div>
                    </div>
                    <div className="px-6 pt-5"></div>
                </ScrollArea>
            </div>
            <SheetContent side="left" className="w-[264px]">
                <SheetHeader>
                    <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
