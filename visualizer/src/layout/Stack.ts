import { assertNever } from "../util.ts";
import type { LayoutingComponent, LayoutingResult } from "./common.ts";

export interface StackProps {
  direction: "vertical" | "horizontal";
  children: LayoutingComponent[];
  align: "start" | "center" | "end";
  gap?: number;
}
export const Stack =
  ({
    children: Children,
    direction,
    align,
    gap,
  }: StackProps): LayoutingComponent =>
  ({ document, root }) => {
    gap ??= 0;

    const children = Children.map((Child) => Child({ document, root }));

    const mainAxis = direction === "horizontal" ? "width" : "height";
    const crossAxis = direction === "horizontal" ? "height" : "width";

    const crossAxisLength = children.reduce(
      (max, child) => Math.max(max, child[crossAxis]),
      0
    );

    const transform: (_: { main: number; cross: number }) => string =
      direction === "horizontal"
        ? ({ main, cross }) => `translate(${main}, ${cross})`
        : ({ main, cross }) => `translate(${cross}, ${main})`;

    let mainAxisAcc = 0;
    for (const child of children) {
      const crossPos =
        align === "start"
          ? 0
          : align === "end"
          ? crossAxisLength - child[crossAxis]
          : align === "center"
          ? (crossAxisLength - child[crossAxis]) / 2
          : assertNever(align);

      child.node.setAttribute(
        "transform",
        transform({ main: mainAxisAcc, cross: crossPos })
      );

      mainAxisAcc += child[mainAxis] + gap;
    }
    mainAxisAcc -= gap;

    const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    children.forEach((c) => node.appendChild(c.node));
    root.appendChild(node);

    return {
      node,
      [mainAxis as "width"]: mainAxisAcc,
      [crossAxis as "height"]: crossAxisLength,
    } satisfies LayoutingResult;
  };
