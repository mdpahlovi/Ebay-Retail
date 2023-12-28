import * as yup from "yup";
import { useAppSelector } from "@/redux/hooks";
import useNavigateWithState from "@/hooks/useNavigator";
import { useLocation } from "react-router-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookingDialogProps } from "@/types";
import { useMutation } from "@apollo/client";
import { CREATE_BOOKING } from "@/graphql/mutations";
import { toast } from "react-toastify";
import Form from "@/components/form";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import toastOption from "@/lib/toastOption";
import capitalizeFirstWord from "@/lib/capitalizeFirstWord";

type BookingInput = { date: string; location: string };
const bookingSchema = yup.object().shape({
    date: yup.string().required("Meeting Date is Required"),
    location: yup.string().required("Meeting Location is Required"),
});

export function BookingTrigger({ isBooked }: { isBooked: boolean }) {
    const { pathname } = useLocation();
    const { navigateTo } = useNavigateWithState();
    const { user } = useAppSelector((state) => state.user);

    const isHome = pathname === "/";
    const config: ButtonProps = { size: isHome ? "default" : "sm", className: isHome ? "w-full" : "", disabled: isBooked };

    if (!user?.id) {
        return (
            <Button {...config} onClick={() => navigateTo("/login")}>
                Book Now
            </Button>
        );
    } else {
        return (
            <DialogTrigger asChild>
                <Button {...config}>Book Now</Button>
            </DialogTrigger>
        );
    }
}

export function BookingDialog({ product, refetch }: BookingDialogProps) {
    const { user } = useAppSelector((state) => state.user);
    const [createBooking] = useMutation(CREATE_BOOKING);
    const handleBook = (data: BookingInput) => {
        const toastId = toast.loading("Please Wait For Booking");
        createBooking({ variables: { ...data, seller: product.seller.id, product: product.id } })
            .then(({ data }: { data?: { createBooking: { id: string } } }) => {
                refetch();
                if (data?.createBooking) toast.update(toastId, toastOption("success", `${product?.name} Booked Successfully`));
            })
            .catch(() => toast.update(toastId, toastOption("error", `Booking Failed`)));
    };

    return (
        <DialogContent>
            <DialogHeader className="flex-row items-center gap-4">
                <DialogTitle>Book {product.name}</DialogTitle>
            </DialogHeader>
            <Form initialValues={{ date: "", location: "" }} validationSchema={bookingSchema} onSubmit={handleBook}>
                <FormDatePicker name="date" label="Meeting Date" />
                <FormInput name="location" label="Meeting Location" />
                {user && user.role === "buyer" ? (
                    <FormSubmit dialog>Book Now</FormSubmit>
                ) : (
                    <span className="text-destructive">{capitalizeFirstWord(user?.role)} Can't Book Product</span>
                )}
            </Form>
        </DialogContent>
    );
}
