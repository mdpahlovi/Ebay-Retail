import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/types/data";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/graphql/queries";
import Loader from "@/components/ui/loader";
import DataTable from "@/components/ui/data-table";
import { DELETE_CATEGORY } from "@/graphql/mutations";

const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "total",
        header: "Total Product",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => <div>{moment(Number(getValue())).format("ll")}</div>,
    },
];

export default function CategoriesTable() {
    const { data, loading, refetch } = useQuery(GET_CATEGORIES, { fetchPolicy: "no-cache" });

    if (loading) return <Loader />;

    return (
        <>
            <h1>All Category</h1>
            <DataTable path="category" deleteMutation={DELETE_CATEGORY} refetch={refetch} columns={columns} data={data.categories} />
        </>
    );
}
