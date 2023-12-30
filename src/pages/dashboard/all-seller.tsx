import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/data";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@apollo/client";
import { GET_ALL_SELLER } from "@/graphql/queries";
import { DELETE_USER } from "@/graphql/mutations";
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
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "plan",
        header: "Current Plan",
        cell: ({ getValue }) => <Badge>{getValue() as string}</Badge>,
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
        cell: ({ getValue }) => <div>{moment(Number(getValue())).format("ll")}</div>,
    },
];

export default function AllSeller() {
    const { data, loading, refetch } = useQuery(GET_ALL_SELLER, { fetchPolicy: "no-cache" });

    if (loading) return <Loader />;

    return (
        <>
            <h1>All Seller</h1>
            <DataTable path="user" columns={columns} deleteMutation={DELETE_USER} refetch={refetch} data={data.allSeller} />
        </>
    );
}
