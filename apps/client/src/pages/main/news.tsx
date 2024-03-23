import { sources } from "@/lib/data";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import { useGetNewsQuery } from "@/redux/apis/newsApi";
import Header from "@/components/ui/header";
import ArticleCard from "@/components/main/news/ArticleCard";
import ResponsivePagination from "react-responsive-pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DateRanger } from "@/components/ui/date-ranger";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({ q: "", sources: "bbc-news" });
    const [date, setDate] = useState<DateRange>({ from: new Date(), to: new Date() });
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const { data, isLoading } = useGetNewsQuery({ ...date, ...query, page, pageSize: 6 });

    return (
        <Sheet>
            <Header title="Discover & Learn" />
            <section className="space-y-6">
                <SheetTrigger asChild>
                    <Button size="sm" className="block ml-auto">
                        Filter New
                    </Button>
                </SheetTrigger>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading
                        ? [...Array(3)].map((_, idx) => <Skeleton key={idx} className="h-80 rounded-lg" />)
                        : data?.articles.map((article, idx) => <ArticleCard key={idx} article={article} />)}
                </div>
                <ResponsivePagination
                    current={page}
                    total={data?.totalPage ? data.totalPage : 0}
                    previousLabel="< Previous"
                    nextLabel="Next >"
                    onPageChange={(page) => setSearchParams({ page: page.toString() })}
                />
            </section>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Filter News</SheetTitle>
                    <SheetDescription className="space-y-4">
                        <div className="space-y-2">
                            <Label>Search</Label>
                            <Input value={query.q} onChange={(e) => setQuery({ ...query, q: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Select Date Range</Label>
                            <DateRanger date={date} setDate={setDate} />
                        </div>
                        <div className="space-y-2">
                            <Label>Select Category</Label>
                            <Select value={query.sources} onValueChange={(sources) => setQuery({ ...query, sources })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {sources.map(({ value, name }) => (
                                        <SelectItem key={value} value={value}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
