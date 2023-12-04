import LogoToggle from "@/components/logo-toggle";
import { Card } from "@/components/ui/card";

export default function Auth({ children }: React.PropsWithChildren) {
    return (
        <div className="bg-auth bg-cover bg-center">
            <section className="min-h-screen grid lg:grid-cols-2 items-center">
                <LogoToggle className="hidden lg:block xl:mx-auto" />
                <Card className="w-full sm:w-[28rem] my-10 mx-auto lg:ml-auto xl:mr-10">
                    <LogoToggle className="block ml-6 mt-8 lg:hidden" />
                    {children}
                </Card>
            </section>
        </div>
    );
}
