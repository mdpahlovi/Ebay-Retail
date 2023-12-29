/* eslint-disable @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
import CanvasJSReact from "@canvasjs/react-charts";
import { Category } from "@/types/data";
import { Card, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function ProductChart({ categories }: { categories: Category[] }) {
    const { theme } = useAppSelector((state) => state.theme);
    const textColor = theme === "light" ? "hsl(20, 14.3%, 4.1%)" : "hsl(60, 9.1%, 97.8%)";

    const options = {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
            fontWight: "bold",
            fontColor: textColor,
            text: "Products In Different Category",
        },
        legend: { fontColor: textColor },
        data: [
            {
                type: "pie",
                startAngle: 75,
                toolTipContent: "{label}: {y}%",
                showInLegend: true,
                legendText: "{label}",
                indexLabel: "{label}",
                indexLabelFontSize: 14,
                indexLabelFontColor: textColor,
                dataPoints: categories.map(({ total, name }) => {
                    return { y: total, label: name };
                }),
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CanvasJSChart options={options} />
            </CardHeader>
        </Card>
    );
}
