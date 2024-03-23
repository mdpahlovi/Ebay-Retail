import moment from "moment";
import capitalizeFirstWord from "@/lib/capitalizeFirstWord";
import { Boxes, LayoutGrid, Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type TotalData = { _id: string; totalCount: string; lastAddedAt: string };

export default function DataCard({ data }: { data: TotalData }) {
    const { _id, totalCount, lastAddedAt } = data;

    return (
        <Card key={_id} className={_id === "admin" ? "hidden" : "block"}>
            <CardHeader className="space-y-2.5">
                <div className="flex justify-between items-center gap-6">
                    <CardTitle className="">Total {capitalizeFirstWord(_id)}</CardTitle>
                    <div>
                        {_id === "category" ? <LayoutGrid /> : null}
                        {_id === "product" ? <Boxes /> : null}
                        {_id === "buyer" || _id === "seller" ? <Users /> : null}
                    </div>
                </div>
                <div>
                    <h3 className="leading-none">{totalCount}</h3>
                    <CardDescription className="flex flex-wrap gap-x-1">
                        <span>last {_id === "buyer" || _id === "seller" ? "joinedAt" : "addedAt"} </span>
                        <span>{moment(Number(lastAddedAt)).format("YYYY-MM-DD")}</span>
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
    );
}
