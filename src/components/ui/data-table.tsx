import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { DataTableProps } from "@/types";
import { useMutation } from "@apollo/client";
import { AlertTriangle, ClipboardEdit, Trash2 } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { ScrollArea, ScrollBar } from "./scroll-area";
import capitalizeFirstWord from "@/lib/capitalizeFirstWord";
import toastOption from "@/lib/toastOption";

export default function DataTable<TData, TValue>({ path, deleteMutation, refetch, columns, data }: DataTableProps<TData, TValue>) {
    const [deletedItem, setDeletedItem] = useState();
    const [deleteItem] = useMutation(deleteMutation);

    const table = useReactTable({
        columns: [
            ...columns,
            {
                id: "edit",
                accessorKey: "id",
                header: "",
                cell: ({ getValue }) => (
                    <Link to={`/dashboard/edit-${path}/${getValue()}`}>
                        <Button size="icon" className="w-8 h-8">
                            <ClipboardEdit size={16} />
                        </Button>
                    </Link>
                ),
            },
            {
                id: "delete",
                accessorKey: "id",
                header: "",
                cell: ({ getValue }) => (
                    <DialogTrigger asChild>
                        <Button variant="destructive" size="icon" className="w-8 h-8" onClick={() => setDeletedItem(getValue())}>
                            <Trash2 size={16} />
                        </Button>
                    </DialogTrigger>
                ),
            },
        ],
        data: data ? data : [],
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleDelete = () => {
        const toastId = toast.loading("Please Wait For Delete");

        deleteItem({ variables: { id: deletedItem } })
            .then(() => {
                refetch();
                toast.update(toastId, toastOption("success", `${capitalizeFirstWord(path)} Deleted Successfully`));
            })
            .catch(() => toast.update(toastId, toastOption("error", "Failed To Delete")));
    };

    return (
        <Dialog>
            <ScrollArea className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="whitespace-nowrap">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                                    No {capitalizeFirstWord(path)} Data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex items-center justify-end gap-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
            <DialogContent>
                <div className="mx-auto w-max p-4 rounded-full bg-destructive/10">
                    <AlertTriangle size={48} className="text-destructive" />
                </div>
                <h4 className="text-center">Are You Sure?</h4>
                <p className="-mt-4 mx-auto max-w-sm text-center">You want to delete this item. Once deleted you cannot undo this item.</p>
                <DialogClose asChild>
                    <Button size="sm" variant="destructive" className="mx-auto w-max" onClick={handleDelete}>
                        Confirm Delete
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
