import type { Program } from "../gen/schema.ts";
import { print, add } from "../../interpreter/gen/native_bindings.json";
import { Box, Padding, Stack, Stadium, Text } from "./layout/mod.ts";

const root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
root.setAttribute("viewBox", "0 0 800 600");
root.setAttribute("width", "800px");
root.setAttribute("height", "600px");
document.body.appendChild(root);
Stack({
  direction: "vertical",
  align: "start",
  children: [
    Box({
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      decorators: {
        "top-left": () => `l 20 5 l 20 -5`,
        "bottom-left": ([x, y]) => `L ${x + 40} ${y} l -20 5 l -20 -5`,
      },
      child: Padding({
        all: 4,
        child: Stack({
          direction: "horizontal",
          align: "center",
          gap: 4,
          children: [
            Text({ contents: "Hello world!" }),
            Stadium({
              fill: "pink",
              stroke: "black",
              strokeWidth: 4,
              child: Text({ contents: "Lorem" }),
            }),
          ],
        }),
      }),
    }),
    Box({
      fill: "white",
      stroke: "black",
      strokeWidth: 4,
      decorators: {
        "top-left": () => `l 20 5 l 20 -5`,
        "bottom-left": ([x, y]) => `L ${x + 40} ${y} l -20 5 l -20 -5`,
      },
      child: Padding({ all: 4, child: Text({ contents: "Wazzup" }) }),
    }),
  ],
})({ document, root });

const program: Program = {
  chunks: [
    {
      statements: [
        { interface: print, arguments: [{ textLiteral: "Hi!" }] },
        {
          interface: print,
          arguments: [
            {
              statement: {
                interface: add,
                arguments: [{ numberLiteral: 1 }, { numberLiteral: 2 }],
              },
            },
          ],
        },
      ],
    },
  ],
};
