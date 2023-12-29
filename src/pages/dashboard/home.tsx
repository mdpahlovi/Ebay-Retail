import moment from "moment";
import { useQuery } from "@apollo/client";
import { DASHBOARD } from "@/graphql/queries";
import Loader from "@/components/ui/loader";
import DataCard, { TotalData } from "@/components/dashboard/home/DataCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AvatarWithFallback } from "@/components/ui/avatar";
import { Booking } from "@/types/data";
import { Link } from "react-router-dom";
import ProductChart from "@/components/dashboard/home/ProductChart";

const DashboardHome = () => {
    const { data, loading } = useQuery(DASHBOARD);

    if (loading) return <Loader />;
    return (
        <>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                {data.dashboard.map((data: TotalData) => (
                    <DataCard key={data._id} data={data} />
                ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
                <ProductChart categories={data.categories} />
                <Card>
                    <CardHeader className="pb-5">
                        <CardTitle>Recent Bookings</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-5">
                        {data.bookings.map(({ id, product, createdAt }: Booking) => (
                            <Link key={id} to="/dashboard/bookings" className="flex gap-2">
                                <AvatarWithFallback src={product.image} className="rounded-lg" />
                                <div>
                                    <h5>{product.name}</h5>
                                    <h6>{moment(Number(createdAt)).format("ll")}</h6>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default DashboardHome;
