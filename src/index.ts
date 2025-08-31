import { version } from "../package.json"
import type { ChartType, Chart } from "chart.js";

export interface PluginOptions {
    backgroundMode: "clear" | "maintain",
    font: string | null,
    fillStyle: string,
}

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    placeholder?: PluginOptions
  }
}

const defaults = {
    backgroundMode: "clear",
    font: "1rem system-ui",
    // tailwindcss `gray-800` (https://tailwindcss.com/docs/colors)
    // tailwindcss license text - https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE
    fillStyle: "oklch(27.8% 0.033 256.848)",
} satisfies PluginOptions

export const PluginPlaceholder = {
    id: "placeholder",
    version,
    defaults,

    afterDraw<TType extends ChartType = ChartType>(chart: Chart<TType>, _: Object, options: Partial<PluginOptions>) {
        const hasData = chart.data.datasets.some((dataset) => dataset.data.length > 0);

        if (hasData) {
            return;
        }

        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;

        if (options.backgroundMode == "clear") {
            chart.clear();
        }

        ctx.save();
        ctx.textAlign = "center";
        ctx.font = options.font || defaults.font
        ctx.fillStyle = options.fillStyle || defaults.fillStyle;
        ctx.textBaseline = "middle";
        ctx.fillText("No data to display", width / 2, height / 2);
        ctx.restore();
    }
}