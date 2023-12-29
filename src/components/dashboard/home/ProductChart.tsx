import Chart, { Props } from "react-apexcharts";
import { Category } from "@/types/data";
import { Card, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";

export default function ProductChart({ categories }: { categories: Category[] }) {
    const { theme } = useAppSelector((state) => state.theme);
    const textColor = theme === "light" ? "hsl(20, 14.3%, 4.1%)" : "hsl(60, 9.1%, 97.8%)";
    const borderColor = theme === "light" ? "hsl(20, 5.9%, 90%)" : "hsl(12, 6.5%, 15.1%)";

    const chartConfig: Props = {
        type: "pie",
        series: categories.map(({ total }) => total),
        options: {
            chart: { toolbar: { show: false } },
            title: { text: "Products In Different Category", style: { fontSize: "18px", color: textColor } },
            labels: categories.map(({ name }) => name),
            responsive: [
                { breakpoint: 448, options: { legend: { show: false } } },
                { breakpoint: 640, options: { legend: { position: "bottom" } } },
                { breakpoint: 768, options: { legend: { position: "right" } } },
                { breakpoint: 1024, options: { legend: { position: "bottom" } } },
                { breakpoint: 1280, options: { legend: { position: "right" } } },
            ],
            legend: { show: true, position: "bottom", fontSize: "14px", labels: { colors: textColor } },
            stroke: { show: true, curve: "smooth", lineCap: "butt", colors: [borderColor], width: 1 },
        },
    };

    return (
        <Card>
            <CardHeader>
                <Chart {...chartConfig} />
            </CardHeader>
        </Card>
    );
}
