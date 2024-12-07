import type { LayoutingComponent } from "./common.ts";

export interface BoxProps {
  child: LayoutingComponent;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  decorators?: Partial<
    Record<
      | `${"top" | "bottom"}-${"left" | "right"}`
      | `${"left" | "right"}-${"top" | "bottom"}`,
      (anchor: [number, number]) => string
    >
  >;
}
export const Box =
  ({
    child: Child,
    fill,
    stroke,
    strokeWidth,
    decorators,
  }: BoxProps): LayoutingComponent =>
  ({ document, root }) => {
    const d = strokeWidth ?? 0;

    const childResult = Child({ document, root });
    const width = childResult.width + 2 * d;
    const height = childResult.height + 2 * d;
    const child = childResult.node;
    child.setAttribute("transform", `translate(${d}, ${d})`);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", fill ?? "transparent");
    path.setAttribute("stroke", stroke ?? "transparent");
    path.setAttribute("stroke-width", `${d}`);
    path.setAttribute("transform", `translate(${d / 2}, ${d / 2})`);

    path.setAttribute(
      "d",
      [
        "M 0 0",
        decorators?.["top-left"]?.([0, 0]) ?? "",
        decorators?.["top-right"]?.([width, 0]) ?? `L ${width} 0`,
        decorators?.["right-top"]?.([width, 0]) ?? "",
        decorators?.["right-bottom"]?.([width, height]) ??
          `L ${width} ${height}`,
        decorators?.["bottom-right"]?.([width, height]) ?? "",
        decorators?.["bottom-left"]?.([0, height]) ?? `L 0 ${height}`,
        decorators?.["left-bottom"]?.([0, height]) ?? "",
        decorators?.["left-top"]?.([0, 0]) ?? "Z",
      ].join(" ")
    );

    const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.appendChild(path);
    node.appendChild(child);
    root.appendChild(node);

    return { width, height, node };
  };
