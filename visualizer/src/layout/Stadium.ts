import type { LayoutingComponent } from "./common.ts";

export interface StadiumProps {
  child: LayoutingComponent;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}

export const Stadium =
  ({
    child: Child,
    fill,
    stroke,
    strokeWidth,
  }: StadiumProps): LayoutingComponent =>
  ({ document, root }) => {
    const d = strokeWidth ?? 0;

    const childResult = Child({ document, root });
    const radius = childResult.height / 2;

    const width = childResult.width + 2 * (radius + d);
    const height = childResult.height + 2 * d;
    const child = childResult.node;
    child.setAttribute("transform", `translate(${radius + d}, 0)`);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", fill ?? "transparent");
    path.setAttribute("stroke", stroke ?? "transparent");
    path.setAttribute("stroke-width", `${d}`);
    path.setAttribute("transform", `translate(${d / 2}, ${d / 2})`);

    path.setAttribute(
      "d",
      [
        `M ${radius} 0`,
        `L ${radius + childResult.width} 0`,
        `A ${radius} ${radius} 0 0 1 ${radius + childResult.width} ${
          childResult.height
        }`,
        `L ${radius} ${childResult.height}`,
        `A ${radius} ${radius} 0 0 1 ${radius} 0`,
      ].join(" ")
    );

    const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.appendChild(path);
    node.appendChild(child);
    root.appendChild(node);

    return { width, height, node };
  };
