import { useQuery } from "@apollo/client";
import { GET_BOOKINGS } from "@/graphql/queries";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/components/ui/loader";
import { ColumnDef } from "@tanstack/react-table";
import { Booking } from "@/types/data";
import { UserToken } from "@/types";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import DataTable from "@/components/ui/data-table";
import { DELETE_BOOKING } from "@/graphql/mutations";

export default function Bookings() {
    const { data, loading, refetch } = useQuery(GET_BOOKINGS, { fetchPolicy: "no-cache" });
    const { user } = useAppSelector((state) => state.user);

    if (loading) return <Loader />;

    const columns: ColumnDef<Booking>[] = [
        {
            accessorKey: user?.role === "buyer" ? "seller" : "buyer",
            header: user?.role === "buyer" ? "Seller" : "Buyer",
            cell: ({ getValue }) => {
                const { name, email, image } = getValue() as UserToken;
                return (
                    <div className="flex items-center gap-2.5">
                        <AvatarWithFallback src={image} />
                        <div>
                            <h6>{name}</h6>
                            <h6>{email}</h6>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: user?.role === "buyer" ? "seller.phone" : "buyer.phone",
            header: "Phone",
        },
        {
            accessorKey: "date",
            header: "Meeting Date",
            cell: ({ getValue }) => <div>{format(new Date(Number(getValue())), "PP")}</div>,
        },
        {
            accessorKey: "location",
            header: "Meeting Location",
        },
        {
            accessorKey: "product.name",
            header: "Product Name",
        },
        {
            accessorKey: "product.resale_price",
            header: "Price",
        },
        {
            accessorKey: "product.condition",
            header: "Condition",
        },
        {
            accessorKey: "createdAt",
            header: "Booking Date",
            cell: ({ getValue }) => <div>{format(new Date(Number(getValue())), "PP")}</div>,
        },
    ];

    return (
        <>
            <h1>All Booking</h1>
            <DataTable path="booking" deleteMutation={DELETE_BOOKING} refetch={refetch} columns={columns} data={data.bookings} />
        </>
    );
}
