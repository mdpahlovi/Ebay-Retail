/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentNode } from "graphql";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./data";

export interface UserToken {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    role: string;
    isVerify: boolean;
}

export interface DataTableProps<TData, TValue> {
    path: string;
    deleteMutation: DocumentNode;
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export interface ProductCardProps {
    product: Product;
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}

export interface BookingDialogProps {
    product: Product;
    refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}
