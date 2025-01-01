import { defineConfig, presetIcons, presetUno } from "unocss";
import { presetDaisy } from "@ameinhardt/unocss-preset-daisy";
import theme from "daisyui/functions/variables.js";

export default defineConfig({
  rules: [
    [
      "i-wouter",
      {
        // path to the svg file must start with / if it's in the public folder
        mask: "url(/wouter.svg) no-repeat center / contain",
        "background-image":
          "linear-gradient(45deg, var(--gradient-from, #47C9FF), var(--gradient-to, #BD34FE))",
      },
    ],
    [
      "i-daisyui",
      {
        "background-image": "url(/daisyui.svg)",
        "background-size": "contain",
        "background-repeat": "no-repeat",
        "background-position": "center",
      },
    ],
  ],
  shortcuts: [],
  presets: [
    presetUno(),
    presetDaisy,
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  theme: {
    ...theme,
  },
});
