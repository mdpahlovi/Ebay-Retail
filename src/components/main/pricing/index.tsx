import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { pricingValues } from "@/lib/initialValues";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import capitalizeFirstWord from "@/lib/capitalizeFirstWord";
import PriceCard from "./price-card";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { userSchema } from "@/validations/userSchema";
import { useMutation } from "@apollo/client";
import { BECOMESELLER } from "@/graphql/mutations";
import { toast } from "react-toastify";
import { pricing } from "@/lib/data";

type BecomeSeller = { name: string; phone: string; address: string };

export default function Pricing() {
    const { pathname } = useLocation();
    const [plan, setPlan] = useState("");
    const { user } = useAppSelector((state) => state.user);
    const [becomeSeller, { loading }] = useMutation(BECOMESELLER);

    const handlePay = (data: BecomeSeller) => {
        becomeSeller({ variables: { plan, ...data } })
            .then(({ data }) => window.open(data.becomeSeller, "_blank"))
            .catch((error) => toast.error(error.message));
    };

    return (
        <Dialog>
            <section>
                {pathname.includes("/pricing") ? null : <h1 className="text-center mb-8">Pricing</h1>}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pricing.map((price, idx) => (
                        <PriceCard key={idx} price={price} setPlan={setPlan} />
                    ))}
                </div>
            </section>
            {user ? (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{capitalizeFirstWord(plan)}</DialogTitle>
                        <DialogDescription>
                            <Form initialValues={pricingValues(user)} validationSchema={userSchema} onSubmit={handlePay}>
                                <FormInput name="name" label="Name" disabled />
                                <FormInput name="email" label="Email" disabled />
                                <FormInput name="phone" label="Phone" />
                                <FormInput name="address" label="Address" />
                                <FormSubmit loading={loading}>Pay Now</FormSubmit>
                            </Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            ) : null}
        </Dialog>
    );
}
