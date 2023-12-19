import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { GET_SELLER_PRODUCTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
];

function getData(): Payment[] {
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52g",
            amount: 101,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52h",
            amount: 102,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52i",
            amount: 103,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52g",
            amount: 101,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52h",
            amount: 102,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52i",
            amount: 103,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52g",
            amount: 101,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52h",
            amount: 102,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52i",
            amount: 103,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52g",
            amount: 101,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52h",
            amount: 102,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "728ed52i",
            amount: 103,
            status: "pending",
            email: "m@example.com",
        },
    ];
}

export default function SellerProducts() {
    const { data, loading } = useQuery(GET_SELLER_PRODUCTS);
    console.log({ data, loading });
    const data1 = getData();

    return (
        <>
            <h1>All Products</h1>
            <DataTable columns={columns} data={data1} />
        </>
    );
}
