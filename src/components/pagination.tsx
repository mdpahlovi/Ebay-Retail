/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

export function PaginationComp({ page, length }: { page: number; length: number }) {
    const totalPage = Math.ceil(length / 6);
    const [_, setSearchParams] = useSearchParams();

    const setPage = (page: number) => setSearchParams({ page: page.toString() });

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem onClick={() => page !== 1 && setPage(page - 1)}>
                    <PaginationPrevious />
                </PaginationItem>
                {[...Array(totalPage)].map((_, idx) => (
                    <PaginationItem key={idx} onClick={() => setPage(idx + 1)}>
                        <PaginationLink isActive={page === idx + 1}>{idx + 1}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem onClick={() => page !== totalPage && setPage(page + 1)}>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
