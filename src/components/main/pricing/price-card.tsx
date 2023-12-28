import { useAppSelector } from "@/redux/hooks";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import useNavigateWithState from "@/hooks/useNavigator";

type Price = { title: string; description: string; amount: string; features: string[] };

export default function PriceCard({ price, setPlan }: { price: Price; setPlan: React.Dispatch<React.SetStateAction<string>> }) {
    const { navigateTo } = useNavigateWithState();
    const { title, description, amount, features } = price;
    const { user } = useAppSelector((state) => state.user);
    const handlePay = () => (user?.id ? setPlan(title.toLowerCase()) : navigateTo("/login"));

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <h1>{amount}&#2547;</h1>
            </CardHeader>
            <CardContent className="space-y-0.5">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        {feature.includes("No") ? (
                            <XCircle size={16} className="bg-destructive text-white rounded-full" />
                        ) : (
                            <CheckCircle2 size={16} className="bg-green-700 text-white rounded-full" />
                        )}
                        <h6>{feature}</h6>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <DialogTrigger asChild>
                    <Button className="w-full" onClick={handlePay}>
                        Become Seller
                    </Button>
                </DialogTrigger>
            </CardFooter>
        </Card>
    );
}
