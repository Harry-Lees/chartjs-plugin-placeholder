import { version } from "../package.json"
import type { ChartType, Chart } from "chart.js";

export const PluginPlaceholder = {
    id: "placeholder",
    version,

    afterDraw<TType extends ChartType = ChartType>(chart: Chart<TType>) {
        const hasData = chart.data.datasets.some((dataset) => dataset.data.length > 0);

        if (!hasData) {
            const ctx = chart.ctx;
            const width = chart.width;
            const height = chart.height;
            chart.clear();

            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText("No data to display", width / 2, height / 2);
            ctx.restore();
        }
    }
}