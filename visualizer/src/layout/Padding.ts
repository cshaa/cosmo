import type { LayoutingComponent } from "./common.ts";

export type Padding =
  | { all: number }
  | { horizontal?: number; vertical?: number }
  | { top?: number; right?: number; bottom?: number; left?: number };

const expandPadding = (p: Padding) => {
  if ("all" in p)
    return { top: p.all, right: p.all, bottom: p.all, left: p.all };
  if ("horizontal" in p || "vertical" in p)
    return {
      top: p.vertical ?? 0,
      bottom: p.vertical ?? 0,
      left: p.horizontal ?? 0,
      right: p.horizontal ?? 0,
    };
  const pp = p as Extract<Padding, { top?: number }>;
  return {
    top: pp.top ?? 0,
    right: pp.right ?? 0,
    bottom: pp.bottom ?? 0,
    left: pp.left ?? 0,
  };
};

export type PaddingProps = Padding & {
  child: LayoutingComponent;
};

export const Padding =
  ({ child: Child, ...padding }: PaddingProps): LayoutingComponent =>
  ({ document, root }) => {
    const { top, right, bottom, left } = expandPadding(padding);
    const child = Child({ document, root });
    child.node.setAttribute("transform", `translate(${left}, ${top})`);

    const node = document.createElementNS("http://www.w3.org/2000/svg", "g");
    node.appendChild(child.node);
    root.appendChild(node);

    return {
      node,
      width: child.width + left + right,
      height: child.height + top + bottom,
    };
  };
