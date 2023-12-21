import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/data";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_ALL_BUYER } from "@/graphql/queries";
import Loader from "@/components/ui/loader";

import DataTable from "@/components/ui/data-table";

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ getValue }) => <AvatarWithFallback src={getValue() as string} />,
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "totalBooking",
        header: "Total Booking",
    },
    {
        accessorKey: "createdAt",
        header: "Joining Date",
        cell: ({ getValue }) => <div>{format(new Date(Number(getValue())), "PP")}</div>,
    },
];

export default function AllBuyer() {
    const { data, loading } = useQuery(GET_ALL_BUYER);

    if (loading) return <Loader />;

    return (
        <>
            <h1>All Buyer</h1>
            <DataTable columns={columns} data={data.allBuyer} />
        </>
    );
}
