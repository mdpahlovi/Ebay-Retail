import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/data";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { useQuery } from "@apollo/client";
import { GET_ALL_BUYER } from "@/graphql/queries";
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
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalBooking",
        header: "Total Booking",
    },
    {
        accessorKey: "createdAt",
        header: "Joining Date",
        cell: ({ getValue }) => <div>{moment(Number(getValue())).format("ll")}</div>,
    },
];

export default function AllBuyer() {
    const { data, loading, refetch } = useQuery(GET_ALL_BUYER, { fetchPolicy: "no-cache" });

    if (loading) return <Loader />;

    return (
        <>
            <h1>All Buyer</h1>
            <DataTable path="user" deleteMutation={DELETE_USER} refetch={refetch} columns={columns} data={data.allBuyer} />
        </>
    );
}
