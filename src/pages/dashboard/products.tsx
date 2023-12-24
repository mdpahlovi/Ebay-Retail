import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/data";
import { useQuery } from "@apollo/client";
import { GET_SELLER_PRODUCTS } from "@/graphql/queries";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/loader";
import DataTable from "@/components/ui/data-table";
import { DELETE_PRODUCT } from "@/graphql/mutations";

const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "resale_price",
        header: "Resale Price",
    },
    {
        accessorKey: "original_price",
        header: "Original Price",
    },
    {
        accessorKey: "purchase_date",
        header: "Purchase Date",
        cell: ({ getValue }) => <div>{format(new Date(Number(getValue())), "PP")}</div>,
    },
    {
        accessorKey: "condition",
        header: "Condition",
        cell: ({ getValue }) => <Badge>{getValue() as string}</Badge>,
    },
    {
        accessorKey: "isBooked",
        header: "Status",
        cell: ({ getValue }) => {
            console.log(getValue());
            return <Badge>{(getValue() as boolean) ? "Booked" : "Padding"}</Badge>;
        },
    },
    {
        accessorKey: "createdAt",
        header: "Post Date",
        cell: ({ getValue }) => <div>{format(new Date(Number(getValue())), "PP")}</div>,
    },
];

export default function SellerProducts() {
    const { data, loading, refetch } = useQuery(GET_SELLER_PRODUCTS);

    if (loading) return <Loader />;

    return (
        <>
            <h1>All Product</h1>
            <DataTable path="product" deleteMutation={DELETE_PRODUCT} refetch={refetch} columns={columns} data={data.products} />
        </>
    );
}
