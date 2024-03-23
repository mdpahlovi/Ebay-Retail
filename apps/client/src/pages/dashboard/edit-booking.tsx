import * as yup from "yup";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKING } from "@/graphql/queries";
import { UPDATE_BOOKING } from "@/graphql/mutations";
import { toast } from "react-toastify";
import Form from "@/components/form";
import FormInput from "@/components/form/FormInput";
import FormDatePicker from "@/components/form/FormDatePicker";
import FormSubmit from "@/components/form/FormSubmit";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/components/ui/loader";
import { updateBookingValues } from "@/lib/initialValues";

type BookingInput = { date: string; location: string };
const bookingSchema = yup.object().shape({
    date: yup.string().required("Meeting Date is Required"),
    location: yup.string().required("Meeting Location is Required"),
});

export default function EditBooking() {
    const params = useParams();
    const navigate = useNavigate();
    const { data, loading } = useQuery(GET_BOOKING, { fetchPolicy: "no-cache", variables: { id: params?.id } });
    const [updateBooking, { loading: updateLoading }] = useMutation(UPDATE_BOOKING);

    const handleBook = (data: BookingInput) => {
        updateBooking({ variables: { id: params?.id, data } })
            .then(({ data }: { data?: { updateBooking: { id: string } } }) => {
                if (data?.updateBooking) toast.success("Booking Updated Successfully");
                navigate("/dashboard/bookings");
            })
            .catch((error) => toast.error(error.message));
    };

    if (loading) return <Loader />;

    return (
        <>
            <h1>Edit {data?.booking?.product?.name} Booking</h1>
            <Form initialValues={updateBookingValues(data?.booking)} validationSchema={bookingSchema} onSubmit={handleBook}>
                <FormDatePicker name="date" label="Meeting Date" />
                <FormInput name="location" label="Meeting Location" />
                <FormSubmit loading={updateLoading}>Submit</FormSubmit>
            </Form>
        </>
    );
}
