import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/data";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function useColumns() {
    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
        },
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
            cell: ({ row }) => <div>{format(new Date(Number(row.getValue("purchase_date"))), "PP")}</div>,
        },
        {
            accessorKey: "condition",
            header: "Condition",
            cell: ({ row }) => <Badge>{row.getValue("condition")}</Badge>,
        },
        {
            accessorKey: "isBooked",
            header: "Status",
            cell: ({ row }) => <Badge>{row.getValue("isBooked") ? "Booked" : "Pending"}</Badge>,
        },
        {
            accessorKey: "createdAt",
            header: "Post Date",
            cell: ({ row }) => <div>{format(new Date(Number(row.getValue("createdAt"))), "PP")}</div>,
        },
    ];

    return columns;
}
