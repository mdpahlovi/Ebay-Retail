import moment from "moment";
import { toast } from "react-toastify";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/data";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SELLER_PRODUCTS } from "@/graphql/queries";
import { Badge } from "@/components/ui/badge";
import Loader from "@/components/ui/loader";
import DataTable from "@/components/ui/data-table";
import { ADVERTISEPRODUCT, DELETE_PRODUCT } from "@/graphql/mutations";
import { Button } from "@/components/ui/button";
import toastOption from "@/lib/toastOption";

export default function SellerProducts() {
    const { data, loading, refetch } = useQuery(GET_SELLER_PRODUCTS, { fetchPolicy: "no-cache" });
    const [advertiseProduct] = useMutation(ADVERTISEPRODUCT);
    const handleAdvertise = (variables: { id: string; advertised: boolean }) => {
        const toastId = toast.loading("Please Wait For Update");

        console.log(variables);

        advertiseProduct({ variables })
            .then((data) => {
                console.log(data);
                refetch();
                toast.update(toastId, toastOption("success", `Operation Successfully`));
            })
            .catch((error) => toast.update(toastId, toastOption("error", error.message)));
    };

    if (loading) return <Loader />;

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
            cell: ({ getValue }) => <div>{moment(Number(getValue())).format("ll")}</div>,
        },
        {
            accessorKey: "condition",
            header: "Condition",
            cell: ({ getValue }) => <Badge>{getValue() as string}</Badge>,
        },
        {
            header: "Advertised",
            cell: ({
                row: {
                    original: { id, advertised },
                },
            }) => (
                <Button
                    className="h-8"
                    variant={advertised ? "destructive" : "default"}
                    onClick={() => handleAdvertise({ id, advertised: advertised ? false : true })}
                >
                    {advertised ? "Pause" : "Run"}
                </Button>
            ),
        },
        {
            accessorKey: "isBooked",
            header: "Status",
            cell: ({ getValue }) => <Badge>{(getValue() as boolean) ? "Booked" : "Padding"}</Badge>,
        },
        {
            accessorKey: "createdAt",
            header: "Post Date",
            cell: ({ getValue }) => <div>{moment(Number(getValue())).format("ll")}</div>,
        },
    ];

    return (
        <>
            <h1>All Product</h1>
            <DataTable path="product" deleteMutation={DELETE_PRODUCT} refetch={refetch} columns={columns} data={data.products} />
        </>
    );
}
