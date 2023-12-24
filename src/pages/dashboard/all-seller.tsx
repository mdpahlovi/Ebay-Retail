import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/data";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_ALL_SELLER } from "@/graphql/queries";
import Loader from "@/components/ui/loader";

import DataTable from "@/components/ui/data-table";
import { DELETE_USER } from "@/graphql/mutations";

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
        accessorKey: "totalProduct",
        header: "Total Product",
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

export default function AllSeller() {
    const { data, loading, refetch } = useQuery(GET_ALL_SELLER);

    if (loading) return <Loader />;

    return (
        <>
            <h1>All Seller</h1>
            <DataTable path="user" columns={columns} deleteMutation={DELETE_USER} refetch={refetch} data={data.allSeller} />
        </>
    );
}
