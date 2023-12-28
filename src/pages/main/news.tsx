/* eslint-disable @typescript-eslint/no-explicit-any */
import { newsapi } from "@/main";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/ui/header";
import ArticleCard from "@/components/main/news/ArticleCard";
import { PaginationComp } from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DateRanger } from "@/components/ui/date-ranger";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sources } from "@/lib/data";

export default function NewsPage() {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [totalResult, setTotalResults] = useState(0);
    const [query, setQuery] = useState({ q: "", sources: "new-york-times" });
    const [date, setDate] = useState<DateRange>({ from: new Date(), to: new Date() });
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    useEffect(() => {
        setLoading(true);
        newsapi.get(`/top-headlines`, { params: { ...date, ...query, page, pageSize: 6 } }).then((res: any) => {
            setArticles(res.data.articles);
            setTotalResults(res.data.totalResults);
            setLoading(false);
        });
    }, [date, page, query]);

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
                    {loading
                        ? [...Array(3)].map((_, idx) => <Skeleton key={idx} className="h-80 rounded-lg" />)
                        : articles.map((article, idx) => <ArticleCard key={idx} article={article} />)}
                </div>
                <PaginationComp page={page} length={totalResult} />
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
