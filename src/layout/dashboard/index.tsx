import UserNav from "../user-nav";
import { PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Dashboard() {
    return (
        <Sheet>
            <div className="h-screen grid lg:grid-cols-[20rem_1fr]">
                <ScrollArea className="border-r hidden lg:block p-6">
                    <Sidebar />
                </ScrollArea>
                <ScrollArea>
                    <div className="sticky-nav h-16 flex justify-between items-center gap-6 px-6">
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
                    <main className="px-6 py-5 space-y-6">
                        <Outlet />
                    </main>
                </ScrollArea>
            </div>
            <SheetContent side="left" className="w-80 p-6">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}
